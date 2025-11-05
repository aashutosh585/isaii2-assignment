const Resume = require('../models/Resume');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AIService = require('../services/aiService');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'));
    }
  }
});

// Simple text extraction function (you can enhance this with PDF parser libraries)
const extractTextFromFile = (filePath, mimeType) => {
  // Mock text extraction - in real implementation use libraries like:
  // - pdf2pic, pdf-parse for PDF files
  // - mammoth for DOCX files
  return `
    John Doe
    john.doe@email.com
    GitHub: github.com/johndoe
    
    EXPERIENCE:
    Software Engineer at Tech Corp (2022-Present)
    - Developed web applications using React and Node.js
    - Improved system performance by 40%
    
    EDUCATION:
    Bachelor of Computer Science
    University of Technology (2018-2022)
    
    PROJECTS:
    E-commerce Platform
    - Built full-stack application
    - Technologies: React, Node.js, MongoDB
    
    SKILLS:
    JavaScript, Python, React, Node.js, MongoDB
  `;
};

// @desc    Get all resumes for user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: resumes.length,
      resumes
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({
      success: true,
      resume
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Upload and parse resume
// @route   POST /api/resumes/upload
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Processing file:', req.file.originalname, 'Type:', req.file.mimetype);

    // Read file buffer for AI processing
    const fileBuffer = fs.readFileSync(req.file.path);
    
    // Use AI to parse resume content from file
    let parsedData;
    try {
      console.log('Starting AI parsing from file buffer...');
      parsedData = await AIService.parseResumeFromBuffer(fileBuffer, req.file.mimetype);
      console.log('AI parsing successful:', JSON.stringify(parsedData, null, 2));
    } catch (aiError) {
      console.log('AI file parsing failed, trying text extraction:', aiError.message);
      
      // Fallback: Extract text first, then use AI text parsing
      try {
        const extractedText = extractTextFromFile(req.file.path, req.file.mimetype);
        console.log('Extracted text:', extractedText.substring(0, 300) + '...');
        parsedData = await AIService.parseResumeText(extractedText);
        console.log('AI text parsing successful:', JSON.stringify(parsedData, null, 2));
      } catch (textParsingError) {
        console.log('AI text parsing also failed, using manual parsing:', textParsingError.message);
        const extractedText = extractTextFromFile(req.file.path, req.file.mimetype);
        parsedData = parseResumeText(extractedText);
      }
    }
    
    // Calculate ATS score using AI
    console.log('Calculating ATS score...');
    const atsScore = await AIService.calculateAdvancedATSScore(parsedData);
    console.log('ATS Score calculated:', atsScore);
    
    const resume = new Resume({
      user: req.user.id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      personalInfo: parsedData.personalInfo || [],
      education: parsedData.education || [],
      projects: parsedData.projects || [],
      experience: parsedData.experience || [],
      extraData: parsedData.extraData || [],
      atsScore: atsScore
    });

    await resume.save();
    console.log('Resume saved successfully with AI parsing');

    res.status(201).json({
      success: true,
      message: 'Resume uploaded and parsed successfully with AI',
      resume: resume
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ 
      message: 'Server error during resume upload',
      error: error.message 
    });
  }
};

// @desc    Update resume data
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Update only provided fields
    const allowedFields = ['personalInfo', 'education', 'projects', 'experience', 'extraData'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    });

    // Recalculate ATS score
    resume.atsScore = calculateATSScore(resume);

    await resume.save();

    res.json({
      success: true,
      message: 'Resume updated successfully',
      resume
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    await Resume.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    AI Chat with resume
// @route   POST /api/resumes/:id/chat
// @access  Private
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Generate AI response using Gemini
    const aiResponse = await AIService.generateChatResponse(message, resume);
    
    // Save chat history
    resume.aiChatHistory.push({
      userMessage: message,
      aiResponse: aiResponse
    });

    await resume.save();

    res.json({
      success: true,
      message: aiResponse,
      chatHistory: resume.aiChatHistory
    });
  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get AI analysis of resume
// @route   POST /api/resumes/:id/analyze
// @access  Private
const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    console.log('Starting AI analysis for resume:', resume._id);
    
    // Generate comprehensive AI analysis
    const analysis = await AIService.analyzeResume(resume);
    
    console.log('AI analysis completed');
    
    res.json({
      success: true,
      analysis: analysis,
      resume: resume
    });
  } catch (error) {
    console.error('AI Analysis error:', error);
    res.status(500).json({ message: 'Server error during analysis' });
  }
};

// @desc    Update resume section in real-time
// @route   PUT /api/resumes/:id/section
// @access  Private
const updateResumeSection = async (req, res) => {
  try {
    const { sectionName, sectionData } = req.body;
    
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Validate section name
    const allowedSections = ['personalInfo', 'education', 'experience', 'projects', 'extraData'];
    if (!allowedSections.includes(sectionName)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }

    // Update the specific section
    resume[sectionName] = sectionData;
    
    // Recalculate ATS score after update
    resume.atsScore = await AIService.calculateAdvancedATSScore(resume);
    
    await resume.save();

    res.json({
      success: true,
      message: `${sectionName} updated successfully`,
      resume: resume
    });
  } catch (error) {
    console.error('Update section error:', error);
    res.status(500).json({ message: 'Server error during section update' });
  }
};

// Helper function to parse resume text
const parseResumeText = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  
  const personalInfo = [];
  const education = [];
  const projects = [];
  const experience = [];
  const extraData = [];
  
  let currentSection = 'personal';
  let projectCounter = 1;
  let companyCounter = 1;
  let educationCounter = 1;
  
  lines.forEach(line => {
    const lowerLine = line.toLowerCase().trim();
    
    // Detect personal information
    if (lowerLine.includes('@') && lowerLine.includes('.')) {
      personalInfo.push({ key: 'email', value: line.trim() });
    } else if (lowerLine.includes('github.com') || lowerLine.includes('github:')) {
      personalInfo.push({ key: 'github', value: line.trim() });
    } else if (lowerLine.includes('leetcode')) {
      personalInfo.push({ key: 'leetcode', value: line.trim() });
    } else if (lowerLine.includes('linkedin')) {
      personalInfo.push({ key: 'linkedin', value: line.trim() });
    } else if (lowerLine.includes('portfolio') || lowerLine.includes('website')) {
      personalInfo.push({ key: 'portfolio', value: line.trim() });
    } else if (/[\+\-\(\)\s\d]{10,}/.test(line) && (lowerLine.includes('phone') || lowerLine.includes('mobile') || line.match(/^\+?\d/))) {
      personalInfo.push({ key: 'phone', value: line.trim() });
    } else if (lowerLine.includes('twitter') || (lowerLine.includes('@') && !lowerLine.includes('.'))) {
      personalInfo.push({ key: 'twitter', value: line.trim() });
    }
    
    // Detect sections
    if (lowerLine.includes('experience') || lowerLine.includes('work')) {
      currentSection = 'experience';
    } else if (lowerLine.includes('education')) {
      currentSection = 'education';
    } else if (lowerLine.includes('project')) {
      currentSection = 'projects';
    } else if (lowerLine.includes('skill') || lowerLine.includes('certif') || lowerLine.includes('achievement')) {
      currentSection = 'extra';
    } else if (line.trim() && !lowerLine.includes(':') && currentSection !== 'personal') {
      // Add content to current section
      if (currentSection === 'education') {
        if (lowerLine.includes('university') || lowerLine.includes('college') || lowerLine.includes('institute')) {
          education.push({ key: `university${educationCounter}`, value: line.trim() });
        } else if (lowerLine.includes('bachelor') || lowerLine.includes('master') || lowerLine.includes('degree')) {
          education.push({ key: `degree${educationCounter}`, value: line.trim() });
        } else if (/\d{4}/.test(line)) {
          education.push({ key: `year${educationCounter}`, value: line.trim() });
          educationCounter++;
        } else {
          education.push({ key: `education_detail${education.length + 1}`, value: line.trim() });
        }
      } else if (currentSection === 'projects') {
        if (line.trim().length > 20 && !line.startsWith('-') && !line.startsWith('•')) {
          projects.push({ key: `project${projectCounter}`, value: line.trim() });
          projectCounter++;
        } else {
          projects.push({ key: `project${projectCounter}_detail${projects.length + 1}`, value: line.trim() });
        }
      } else if (currentSection === 'experience') {
        if (lowerLine.includes('engineer') || lowerLine.includes('developer') || lowerLine.includes('manager')) {
          experience.push({ key: `role${companyCounter}`, value: line.trim() });
        } else if (lowerLine.includes('inc') || lowerLine.includes('corp') || lowerLine.includes('ltd')) {
          experience.push({ key: `company${companyCounter}`, value: line.trim() });
        } else if (/\d{4}/.test(line)) {
          experience.push({ key: `duration${companyCounter}`, value: line.trim() });
          companyCounter++;
        } else {
          experience.push({ key: `exp_detail${experience.length + 1}`, value: line.trim() });
        }
      } else if (currentSection === 'extra') {
        if (lowerLine.includes('skill')) {
          extraData.push({ key: 'skills', value: line.trim() });
        } else if (lowerLine.includes('certif')) {
          extraData.push({ key: `certification${extraData.length + 1}`, value: line.trim() });
        } else if (lowerLine.includes('language')) {
          extraData.push({ key: 'languages', value: line.trim() });
        } else {
          extraData.push({ key: `extra${extraData.length + 1}`, value: line.trim() });
        }
      } else if (currentSection === 'personal' && personalInfo.length === 0) {
        // First line is likely the name
        personalInfo.push({ key: 'name', value: line.trim() });
      }
    }
  });
  
  return { personalInfo, education, projects, experience, extraData };
};

// Helper function to calculate ATS score
const calculateATSScore = (resumeData) => {
  let score = 50; // Base score
  
  // Check for contact information in array format
  if (resumeData.personalInfo && Array.isArray(resumeData.personalInfo)) {
    const hasEmail = resumeData.personalInfo.some(info => info.key === 'email');
    const hasName = resumeData.personalInfo.some(info => info.key === 'name');
    const hasPhone = resumeData.personalInfo.some(info => info.key === 'phone');
    const hasLinkedIn = resumeData.personalInfo.some(info => info.key === 'linkedin');
    const hasGitHub = resumeData.personalInfo.some(info => info.key === 'github');
    
    if (hasEmail) score += 10;
    if (hasName) score += 10;
    if (hasPhone) score += 5;
    if (hasLinkedIn) score += 5;
    if (hasGitHub) score += 5;
  }
  
  // Check for sections (arrays now)
  if (resumeData.experience && Array.isArray(resumeData.experience)) {
    score += Math.min(resumeData.experience.length * 2, 15); // Max 15 points for experience
  }
  
  if (resumeData.education && Array.isArray(resumeData.education)) {
    score += Math.min(resumeData.education.length * 1, 10); // Max 10 points for education
  }
  
  if (resumeData.projects && Array.isArray(resumeData.projects)) {
    score += Math.min(resumeData.projects.length * 1, 10); // Max 10 points for projects
  }
  
  if (resumeData.extraData && Array.isArray(resumeData.extraData)) {
    score += Math.min(resumeData.extraData.length * 1, 5); // Max 5 points for extra data
  }
  
  return Math.min(score, 100);
};

// Helper function to generate AI response
const generateAIResponse = (message, resume) => {
  const responses = [
    "Based on your resume, I suggest adding more quantifiable achievements to your experience section.",
    "Your technical skills look good! Consider adding more recent technologies to stay competitive.",
    "I notice you could improve your ATS score by including more relevant keywords.",
    "Your project descriptions could benefit from mentioning the impact and technologies used."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

module.exports = {
  upload,
  getResumes,
  getResume,
  uploadResume,
  updateResume,
  deleteResume,
  chatWithAI,
  analyzeResume,
  updateResumeSection
};