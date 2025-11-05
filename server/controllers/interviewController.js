const aiService = require('../services/aiService');

// Mock interview sessions storage (in production, use database)
const interviewSessions = new Map();

// Start AI Interview
const startInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { role = 'Software Engineer', company = 'TechCorp', difficulty = 'medium' } = req.body;
    
    // Generate interview questions based on role and difficulty
    const questions = await generateInterviewQuestions(role, difficulty);
    
    const session = {
      id: interviewId,
      userId: req.user.id,
      role,
      company,
      difficulty,
      questions,
      currentQuestionIndex: 0,
      responses: [],
      startTime: new Date(),
      status: 'active'
    };
    
    interviewSessions.set(interviewId, session);
    
    res.json({
      success: true,
      session: {
        id: session.id,
        role: session.role,
        company: session.company,
        totalQuestions: questions.length,
        currentQuestion: questions[0],
        timeLimit: 30 * 60 // 30 minutes
      }
    });
  } catch (error) {
    console.error('Error starting interview:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to start interview' 
    });
  }
};

// Get Current Question
const getCurrentQuestion = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const session = interviewSessions.get(interviewId);
    
    if (!session || session.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Interview session not found'
      });
    }
    
    const currentQuestion = session.questions[session.currentQuestionIndex];
    
    res.json({
      success: true,
      question: currentQuestion,
      questionNumber: session.currentQuestionIndex + 1,
      totalQuestions: session.questions.length,
      timeRemaining: calculateTimeRemaining(session.startTime)
    });
  } catch (error) {
    console.error('Error getting current question:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get current question' 
    });
  }
};

// Submit Answer
const submitAnswer = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { answer, timeSpent } = req.body;
    const session = interviewSessions.get(interviewId);
    
    if (!session || session.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Interview session not found'
      });
    }
    
    // Store the response
    const response = {
      questionIndex: session.currentQuestionIndex,
      question: session.questions[session.currentQuestionIndex],
      answer,
      timeSpent,
      timestamp: new Date()
    };
    
    session.responses.push(response);
    
    // Get AI feedback for the answer
    const feedback = await getAnswerFeedback(response.question, answer);
    response.feedback = feedback;
    
    // Move to next question
    session.currentQuestionIndex++;
    
    const hasMoreQuestions = session.currentQuestionIndex < session.questions.length;
    const nextQuestion = hasMoreQuestions ? session.questions[session.currentQuestionIndex] : null;
    
    res.json({
      success: true,
      feedback,
      hasMoreQuestions,
      nextQuestion,
      questionNumber: session.currentQuestionIndex + 1,
      totalQuestions: session.questions.length
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit answer' 
    });
  }
};

// End Interview
const endInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const session = interviewSessions.get(interviewId);
    
    if (!session || session.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Interview session not found'
      });
    }
    
    session.endTime = new Date();
    session.status = 'completed';
    
    // Generate overall interview analysis
    const analysis = await generateInterviewAnalysis(session);
    
    // Calculate score based on responses
    const score = calculateInterviewScore(session.responses);
    
    const result = {
      interviewId: session.id,
      role: session.role,
      company: session.company,
      duration: Math.floor((session.endTime - session.startTime) / 1000 / 60), // minutes
      questionsAnswered: session.responses.length,
      totalQuestions: session.questions.length,
      score,
      analysis,
      responses: session.responses
    };
    
    res.json({
      success: true,
      result
    });
    
    // Clean up session after some time
    setTimeout(() => {
      interviewSessions.delete(interviewId);
    }, 24 * 60 * 60 * 1000); // 24 hours
    
  } catch (error) {
    console.error('Error ending interview:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to end interview' 
    });
  }
};

// Get Interview History
const getInterviewHistory = async (req, res) => {
  try {
    // In production, fetch from database
    const mockHistory = [
      {
        id: '1',
        role: 'Software Engineer',
        company: 'Google',
        date: '2023-12-01',
        score: 85,
        status: 'completed'
      },
      {
        id: '2',
        role: 'Product Manager',
        company: 'Microsoft',
        date: '2023-11-28',
        score: 92,
        status: 'completed'
      }
    ];
    
    res.json({
      success: true,
      interviews: mockHistory
    });
  } catch (error) {
    console.error('Error getting interview history:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get interview history' 
    });
  }
};

// Helper Functions
const generateInterviewQuestions = async (role, difficulty) => {
  const prompt = `Generate 5 interview questions for a ${role} position with ${difficulty} difficulty level. 
  Return an array of question objects with 'id', 'question', 'type' (behavioral/technical/situational), and 'expectedPoints' fields.
  Focus on real-world scenarios and practical skills assessment.`;

  try {
    const response = await aiService.generateText(prompt);
    // Parse the AI response and structure it properly
    const questions = JSON.parse(response);
    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    // Fallback questions
    return [
      {
        id: 1,
        question: "Tell me about yourself and your background in software development.",
        type: "behavioral",
        expectedPoints: ["Experience", "Skills", "Motivation", "Goals"]
      },
      {
        id: 2,
        question: "Describe a challenging project you worked on. What was your approach?",
        type: "behavioral",
        expectedPoints: ["Problem-solving", "Technical skills", "Project management", "Results"]
      },
      {
        id: 3,
        question: "Tell me about a time you had to handle a difficult stakeholder. How did you manage the situation and what was the outcome?",
        type: "situational",
        expectedPoints: ["Communication", "Conflict resolution", "Stakeholder management", "Outcome"]
      },
      {
        id: 4,
        question: "How do you stay updated with the latest technologies in your field?",
        type: "behavioral",
        expectedPoints: ["Learning approach", "Resources", "Implementation", "Growth mindset"]
      },
      {
        id: 5,
        question: "Where do you see yourself in the next 5 years?",
        type: "behavioral",
        expectedPoints: ["Career goals", "Growth plan", "Company alignment", "Ambition"]
      }
    ];
  }
};

const getAnswerFeedback = async (question, answer) => {
  const prompt = `As an AI interview coach, provide constructive feedback for this interview answer:
  
  Question: ${question.question}
  Answer: ${answer}
  
  Provide feedback in this JSON format:
  {
    "score": (1-10),
    "strengths": ["strength1", "strength2"],
    "improvements": ["improvement1", "improvement2"],
    "summary": "Brief overall assessment"
  }`;

  try {
    const response = await aiService.generateText(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error getting feedback:', error);
    return {
      score: 7,
      strengths: ["Good structure", "Relevant examples"],
      improvements: ["Add more specific details", "Quantify achievements"],
      summary: "Solid answer with room for improvement"
    };
  }
};

const generateInterviewAnalysis = async (session) => {
  const prompt = `Analyze this interview session and provide comprehensive feedback:
  
  Role: ${session.role}
  Total Questions: ${session.questions.length}
  Responses: ${session.responses.length}
  
  Provide analysis in this JSON format:
  {
    "overallScore": (1-100),
    "strengths": ["strength1", "strength2", "strength3"],
    "areasForImprovement": ["area1", "area2", "area3"],
    "recommendations": ["rec1", "rec2", "rec3"],
    "summary": "Overall interview performance summary"
  }`;

  try {
    const response = await aiService.generateText(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error generating analysis:', error);
    return {
      overallScore: 78,
      strengths: ["Clear communication", "Good technical knowledge", "Structured thinking"],
      areasForImprovement: ["More specific examples", "Better time management", "Stronger closing statements"],
      recommendations: ["Practice STAR method", "Prepare more quantified examples", "Work on confidence"],
      summary: "Good overall performance with clear areas for growth"
    };
  }
};

const calculateInterviewScore = (responses) => {
  if (responses.length === 0) return 0;
  
  const totalScore = responses.reduce((sum, response) => {
    return sum + (response.feedback?.score || 5);
  }, 0);
  
  return Math.round((totalScore / responses.length) * 10); // Convert to 0-100 scale
};

const calculateTimeRemaining = (startTime) => {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  const totalTime = 30 * 60; // 30 minutes
  return Math.max(0, totalTime - elapsed);
};

module.exports = {
  startInterview,
  getCurrentQuestion,
  submitAnswer,
  endInterview,
  getInterviewHistory
};