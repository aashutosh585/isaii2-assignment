const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Mock test questions
const mockQuestions = {
  aptitude: [
    {
      id: 1,
      question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
      options: ["24", "32", "28", "20"],
      correct: 1,
      explanation: "This is a geometric sequence where each number is multiplied by 2."
    },
    {
      id: 2,
      question: "If a train travels 120 km in 2 hours, what is its speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correct: 1,
      explanation: "Speed = Distance / Time = 120 km / 2 hours = 60 km/h"
    }
  ],
  coding: [
    {
      id: 1,
      question: "Write a function to reverse a string",
      difficulty: "Easy",
      testCases: [
        { input: "hello", expected: "olleh" },
        { input: "world", expected: "dlrow" }
      ]
    }
  ],
  hr: [
    {
      id: 1,
      question: "Tell me about yourself",
      type: "behavioral",
      tips: "Focus on professional achievements and relevant experience"
    }
  ]
};

// @desc    Start a test
// @route   POST /api/tests/start
// @access  Private
router.post('/start', protect, async (req, res) => {
  try {
    const { type, difficulty } = req.body;
    
    if (!type || !['aptitude', 'coding', 'hr'].includes(type)) {
      return res.status(400).json({ message: 'Invalid test type' });
    }
    
    const questions = mockQuestions[type] || [];
    
    const testSession = {
      id: Date.now(),
      type,
      difficulty: difficulty || 'medium',
      questions: questions.map(q => ({ ...q, userAnswer: null })),
      startTime: new Date(),
      timeLimit: type === 'aptitude' ? 30 : type === 'coding' ? 90 : 35, // minutes
      status: 'active'
    };
    
    res.status(200).json({
      success: true,
      message: 'Test started successfully',
      test: testSession
    });
  } catch (error) {
    console.error('Start test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Submit test answer
// @route   POST /api/tests/submit
// @access  Private
router.post('/submit', protect, async (req, res) => {
  try {
    const { testId, questionId, answer } = req.body;
    
    // In a real app, you would save this to database
    // For now, just return success
    
    res.status(200).json({
      success: true,
      message: 'Answer submitted successfully'
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Complete test and get results
// @route   POST /api/tests/complete
// @access  Private
router.post('/complete', protect, async (req, res) => {
  try {
    const { testId, answers } = req.body;
    
    // Calculate score (mock calculation)
    const totalQuestions = 20;
    const correctAnswers = Math.floor(Math.random() * 5) + 15; // Random score between 15-20
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    const results = {
      testId,
      score,
      correctAnswers,
      totalQuestions,
      timeTaken: '25:30',
      performance: {
        strengths: ['Logical Reasoning', 'Time Management'],
        weaknesses: ['Probability', 'Permutation & Combination'],
        recommendations: [
          'Practice more probability questions',
          'Focus on permutation and combination concepts'
        ]
      }
    };
    
    res.status(200).json({
      success: true,
      message: 'Test completed successfully',
      results
    });
  } catch (error) {
    console.error('Complete test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get test history
// @route   GET /api/tests/history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    // Mock test history
    const history = [
      {
        id: 1,
        type: 'aptitude',
        score: 89,
        date: new Date(),
        timeTaken: '28:45',
        status: 'completed'
      },
      {
        id: 2,
        type: 'coding',
        score: 76,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        timeTaken: '85:30',
        status: 'completed'
      }
    ];
    
    res.status(200).json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Get test history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;