const { GoogleGenAI } = require('@google/genai');

// Initialize Google AI
const ai = new GoogleGenAI({});

// System instruction for resume parsing
const RESUME_PARSER_INSTRUCTION = `
You are an expert resume parser. Extract ONLY the information that is ACTUALLY PRESENT in the resume. 

CRITICAL RULES:
1. DO NOT add any field if the information is not found in the resume
2. DO NOT make assumptions or add placeholder data
3. Only include fields with actual, real data from the resume
4. If portfolio/website is not mentioned, DO NOT add portfolio key
5. If GitHub is not mentioned, DO NOT add github key
6. If phone is not mentioned, DO NOT add phone key
7. Extract data exactly as written, no modifications

For PROJECTS section, extract:
- project_name: "Actual Project Name"
- project_desc: "Detailed description with bullet points if available"
- project_tech: "Technologies used"
- project_link: "Deployment link or GitHub link" (ONLY if mentioned)

For EXPERIENCE section, extract:
- company_name: "Company Name"
- role: "Job Title/Position"
- duration: "Time period"
- responsibilities: "Job duties and achievements as bullet points"

Return ONLY valid JSON in this format, including ONLY fields with actual data:

{
  "personalInfo": [
    {"key": "name", "value": "Actual Name Found"},
    {"key": "email", "value": "Actual Email Found"}
    // Add other fields ONLY if they exist in resume
  ],
  "education": [
    {"key": "university", "value": "Actual University Name"},
    {"key": "degree", "value": "Actual Degree Name"}
    // Add other fields ONLY if they exist
  ],
  "experience": [
    {"key": "company_name", "value": "Actual Company"},
    {"key": "role", "value": "Actual Position"},
    {"key": "duration", "value": "Actual Time Period"},
    {"key": "responsibilities", "value": "Actual job duties and achievements"}
    // For multiple experiences, use company_name2, role2, etc.
  ],
  "projects": [
    {"key": "project_name", "value": "Actual Project Name"},
    {"key": "project_desc", "value": "Actual project description with details"},
    {"key": "project_tech", "value": "Actual technologies mentioned"},
    {"key": "project_link", "value": "Actual link if provided"}
    // For multiple projects, use project_name2, project_desc2, etc.
  ],
  "extraData": [
    {"key": "skills", "value": "Actual skills listed"},
    {"key": "certifications", "value": "Actual certifications mentioned"}
    // Add other fields ONLY if they exist
  ],
   // Add other fields ONLY if they exist
}

DO NOT include any field if the data is not present in the resume.
`;

// System instruction for resume suggestions
const RESUME_ADVISOR_INSTRUCTION = `
You are an expert career advisor and resume specialist. You have complete access to the user's resume data and can provide personalized, specific advice.

Your role:
1. Analyze the user's COMPLETE resume data provided in the context
2. Reference specific details from their resume when giving advice
3. Identify missing sections that would strengthen their profile
4. Suggest improvements for existing content
5. Provide ATS optimization recommendations
6. Give industry-specific advice based on their experience/projects
7. Help with formatting and content improvements
8. Suggest what information to add based on their career level

When the user asks questions:
- Always reference their actual resume data
- Be specific about what they have and what they're missing
- Provide actionable, concrete suggestions
- If they're missing important sections (like portfolio, GitHub, etc.), suggest adding them
- Help improve existing project descriptions, experience details, etc.
- Give personalized advice based on their actual background

Be encouraging, specific, and always relate your advice to their actual resume content.
`;

class AIService {
  // Parse resume text using AI and return structured format
  static async parseResumeText(resumeText) {
    try {
      const enhancedPrompt = `
        Extract resume information from this text. Follow these rules strictly:
        1. ONLY include information that is explicitly mentioned in the text
        2. DO NOT add placeholder or assumed data
        3. If portfolio/website is not mentioned, DO NOT include it
        4. If GitHub is not mentioned, DO NOT include it
        5. For projects, extract: name, description, technologies, links (only if mentioned)
        6. For experience, extract: company name, role, duration, responsibilities
        7. Return clean, accurate data in JSON format

        Resume text:
        ${resumeText}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: enhancedPrompt,
        config: {
          systemInstruction: RESUME_PARSER_INSTRUCTION,
        },
      });

      const text = response.text;
      console.log('AI Text Parsing Response:', text);

      // Extract JSON from response
      let jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsedData = JSON.parse(jsonMatch[0]);
          console.log('Successfully parsed JSON:', JSON.stringify(parsedData, null, 2));
          return parsedData;
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          return this.fallbackParsing(resumeText);
        }
      }

      console.log('No JSON found in AI response, using fallback');
      return this.fallbackParsing(resumeText);
    } catch (error) {
      console.error('AI Resume Parsing Error:', error);
      return this.fallbackParsing(resumeText);
    }
  }

  // Analyze resume content using AI
  static async analyzeResume(resumeData) {
    try {
      const resumeContext = `
        CURRENT RESUME DATA:
        Personal Info: ${JSON.stringify(resumeData.personalInfo, null, 2)}
        Education: ${JSON.stringify(resumeData.education, null, 2)}
        Experience: ${JSON.stringify(resumeData.experience, null, 2)}
        Projects: ${JSON.stringify(resumeData.projects, null, 2)}
        Extra Data: ${JSON.stringify(resumeData.extraData, null, 2)}
        Current ATS Score: ${resumeData.atsScore}/100
        
        Please provide a comprehensive analysis of this resume with:
        1. Overall assessment and current strengths
        2. Areas that need improvement
        3. Specific suggestions for each section
        4. Missing information that should be added
        5. ATS optimization recommendations
        6. Industry-specific advice
        
        Be specific and actionable in your recommendations.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: resumeContext,
        config: {
          systemInstruction: RESUME_ADVISOR_INSTRUCTION,
        },
      });

      return response.text;
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return 'Unable to analyze resume at the moment. Please try again later.';
    }
  }

  // Parse resume from file buffer using AI with document support
  static async parseResumeFromBuffer(fileBuffer, mimeType) {
    try {
      // Convert buffer to base64 for AI processing
      const base64Data = fileBuffer.toString('base64');
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { text: "Extract and parse all resume information from this document:" },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          }
        ],
        config: {
          systemInstruction: RESUME_PARSER_INSTRUCTION,
        },
      });

      const text = response.text;
      console.log('AI File Parsing Response:', text);
      
      // Try to parse JSON response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
      }

      // Fallback: return basic parsing if AI fails
      return this.fallbackParsing(text);
    } catch (error) {
      console.error('AI File Parsing Error:', error);
      return this.fallbackParsing();
    }
  }

  // Fallback parsing method when AI fails - only extract data that's actually present
  static fallbackParsing(text = '') {
    console.log('Using fallback parsing for text:', text.substring(0, 200) + '...');
    
    const lines = text.split('\n').filter(line => line.trim());
    const personalInfo = [];
    const education = [];
    const experience = [];
    const projects = [];
    const extraData = [];

    let currentSection = 'personal';
    let projectCount = 1;
    let companyCount = 1;

    // Basic text parsing as fallback - only add data that exists
    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase().trim();
      
      // Section detection
      if (lowerLine.includes('experience') || lowerLine.includes('work history')) {
        currentSection = 'experience';
        return;
      } else if (lowerLine.includes('education')) {
        currentSection = 'education';
        return;
      } else if (lowerLine.includes('project')) {
        currentSection = 'projects';
        return;
      } else if (lowerLine.includes('skill') || lowerLine.includes('technical')) {
        currentSection = 'skills';
        return;
      }
      
      // Extract personal info only if actually present
      if (currentSection === 'personal' || index < 5) {
        if (lowerLine.includes('@') && lowerLine.includes('.') && !lowerLine.includes('http')) {
          personalInfo.push({ key: 'email', value: line.trim() });
        } else if (index === 0 && !lowerLine.includes(':') && line.length > 2 && line.length < 50) {
          personalInfo.push({ key: 'name', value: line.trim() });
        } else if (/[\+\-\(\)\s\d]{10,}/.test(line) && (lowerLine.includes('phone') || lowerLine.includes('mobile') || line.match(/^\+?[\d\s\-\(\)]{10,}/))) {
          personalInfo.push({ key: 'phone', value: line.trim() });
        } else if (lowerLine.includes('linkedin.com') || (lowerLine.includes('linkedin') && lowerLine.includes('http'))) {
          personalInfo.push({ key: 'linkedin', value: line.trim() });
        } else if (lowerLine.includes('github.com') || (lowerLine.includes('github') && lowerLine.includes('http'))) {
          personalInfo.push({ key: 'github', value: line.trim() });
        } else if ((lowerLine.includes('portfolio') || lowerLine.includes('website')) && lowerLine.includes('http')) {
          personalInfo.push({ key: 'portfolio', value: line.trim() });
        }
      } else if (currentSection === 'experience' && line.trim().length > 3) {
        if (lowerLine.includes('inc') || lowerLine.includes('corp') || lowerLine.includes('ltd') || lowerLine.includes('company')) {
          experience.push({ key: `company_name${companyCount}`, value: line.trim() });
        } else if (lowerLine.includes('engineer') || lowerLine.includes('developer') || lowerLine.includes('manager') || lowerLine.includes('analyst')) {
          experience.push({ key: `role${companyCount}`, value: line.trim() });
        } else if (/\d{4}/.test(line) && (lowerLine.includes('-') || lowerLine.includes('to') || lowerLine.includes('present'))) {
          experience.push({ key: `duration${companyCount}`, value: line.trim() });
          companyCount++;
        } else if (line.startsWith('-') || line.startsWith('•')) {
          experience.push({ key: `responsibilities${companyCount}`, value: line.trim() });
        }
      } else if (currentSection === 'projects' && line.trim().length > 3) {
        if (!line.startsWith('-') && !line.startsWith('•') && !lowerLine.includes('technologies') && line.length > 5) {
          projects.push({ key: `project_name${projectCount}`, value: line.trim() });
        } else if (line.startsWith('-') || line.startsWith('•')) {
          projects.push({ key: `project_desc${projectCount}`, value: line.trim() });
        } else if (lowerLine.includes('technologies') || lowerLine.includes('tech stack') || lowerLine.includes('built with')) {
          projects.push({ key: `project_tech${projectCount}`, value: line.trim() });
        } else if (lowerLine.includes('http') || lowerLine.includes('github.com')) {
          projects.push({ key: `project_link${projectCount}`, value: line.trim() });
          projectCount++;
        }
      } else if (currentSection === 'skills' && line.trim().length > 3) {
        extraData.push({ key: 'skills', value: line.trim() });
      } else if (currentSection === 'education' && line.trim().length > 3) {
        if (lowerLine.includes('university') || lowerLine.includes('college') || lowerLine.includes('institute')) {
          education.push({ key: 'university', value: line.trim() });
        } else if (lowerLine.includes('bachelor') || lowerLine.includes('master') || lowerLine.includes('degree')) {
          education.push({ key: 'degree', value: line.trim() });
        } else if (/\d{4}/.test(line)) {
          education.push({ key: 'graduation_year', value: line.trim() });
        }
      }
    });

    // Only return sections that have actual data
    const result = {};
    if (personalInfo.length > 0) result.personalInfo = personalInfo;
    if (education.length > 0) result.education = education;
    if (experience.length > 0) result.experience = experience;
    if (projects.length > 0) result.projects = projects;
    if (extraData.length > 0) result.extraData = extraData;

    // If no data found at all, return minimal structure with placeholders
    if (Object.keys(result).length === 0) {
      return {
        personalInfo: [{ key: 'name', value: 'Please update your name' }],
        education: [],
        experience: [],
        projects: [],
        extraData: []
      };
    }

    return {
      personalInfo: result.personalInfo || [],
      education: result.education || [],
      experience: result.experience || [],
      projects: result.projects || [],
      extraData: result.extraData || []
    };
  }

  // Generate AI chat response with full resume context
  static async generateChatResponse(message, resumeData) {
    try {
      const resumeContext = `
        STUDENT'S COMPLETE RESUME INFORMATION:
        
        Personal Information: ${JSON.stringify(resumeData.personalInfo, null, 2)}
        Education: ${JSON.stringify(resumeData.education, null, 2)}
        Work Experience: ${JSON.stringify(resumeData.experience, null, 2)}
        Projects: ${JSON.stringify(resumeData.projects, null, 2)}
        Skills & Additional Info: ${JSON.stringify(resumeData.extraData, null, 2)}
        Current ATS Score: ${resumeData.atsScore}/100
        
        Student's Question/Request: ${message}
        
        Based on the complete resume information above, provide specific, actionable advice. 
        Reference specific details from their resume when giving suggestions.
        Help them improve their resume for their career goals.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: resumeContext,
        config: {
          systemInstruction: RESUME_ADVISOR_INSTRUCTION,
        },
      });

      return response.text;
    } catch (error) {
      console.error('AI Chat Error:', error);
      return "I'm having trouble processing your request right now. Please try asking something else about your resume.";
    }
  }

  // Calculate enhanced ATS score using AI
  static async calculateAdvancedATSScore(resumeData) {
    try {
      const scorePrompt = `
        Analyze this resume for ATS (Applicant Tracking System) compatibility and return ONLY a number between 0-100:
        
        Personal Info: ${JSON.stringify(resumeData.personalInfo)}
        Education: ${JSON.stringify(resumeData.education)}
        Experience: ${JSON.stringify(resumeData.experience)}
        Projects: ${JSON.stringify(resumeData.projects)}
        Extra Data: ${JSON.stringify(resumeData.extraData)}
        
        Score based on:
        - Contact info completeness (20 points)
        - Section organization (20 points)
        - Content quality (25 points)
        - Keyword optimization (20 points)
        - Professional formatting (15 points)
        
        Return ONLY the numeric score (0-100).
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: scorePrompt,
        config: {
          systemInstruction: "You are an ATS scoring expert. Return only a number between 0-100, nothing else.",
        },
      });

      const text = response.text;
      
      // Extract number from response
      const score = parseInt(text.match(/\d+/)?.[0] || '50');
      return Math.min(Math.max(score, 0), 100);
    } catch (error) {
      console.error('AI Score Error:', error);
      return this.basicATSScore(resumeData);
    }
  }

  // Basic ATS score calculation (fallback)
  static basicATSScore(resumeData) {
    let score = 50;
    
    if (resumeData.personalInfo?.length > 0) {
      const hasEmail = resumeData.personalInfo.some(info => info.key === 'email');
      const hasName = resumeData.personalInfo.some(info => info.key === 'name');
      const hasPhone = resumeData.personalInfo.some(info => info.key === 'phone');
      
      if (hasEmail) score += 15;
      if (hasName) score += 15;
      if (hasPhone) score += 10;
    }
    
    if (resumeData.experience?.length > 0) score += 10;
    if (resumeData.education?.length > 0) score += 5;
    if (resumeData.projects?.length > 0) score += 5;
    
    return Math.min(score, 100);
  }
}

module.exports = AIService;