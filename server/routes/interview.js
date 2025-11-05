const express = require('express');
const { protect } = require('../middleware/auth');
const {
  startInterview,
  getCurrentQuestion,
  submitAnswer,
  endInterview,
  getInterviewHistory
} = require('../controllers/interviewController');

const router = express.Router();

// Mock interview data
const mockInterviews = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    package: '$120k',
    date: '15 Dec 2023',
    logo: 'G',
    status: 'scheduled',
    difficulty: 'Hard',
    description: 'Full-stack development role focusing on scalable web applications.'
  },
  {
    id: 2,
    role: 'Product Manager',
    company: 'Microsoft',
    location: 'Seattle, WA',
    package: '$110k',
    date: '18 Dec 2023',
    logo: 'M',
    status: 'applied',
    difficulty: 'Medium',
    description: 'Lead product development for Microsoft Azure services.'
  },
  {
    id: 3,
    role: 'Data Analyst',
    company: 'Amazon',
    location: 'Seattle, WA',
    package: '$95k',
    date: '20 Dec 2023',
    logo: 'A',
    status: 'pending',
    difficulty: 'Easy',
    description: 'Analyze customer data to drive business insights and decisions.'
  },
  {
    id: 4,
    role: 'UX Designer',
    company: 'Figma',
    location: 'San Francisco, CA',
    package: '$105k',
    date: '22 Dec 2023',
    logo: 'F',
    status: 'interview',
    difficulty: 'Medium',
    description: 'Design user experiences for collaborative design tools.'
  }
];

// @desc    Get all interviews
// @route   GET /api/interviews
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { search, status, difficulty } = req.query;
    
    let filteredInterviews = [...mockInterviews];
    
    if (search) {
      filteredInterviews = filteredInterviews.filter(interview => 
        interview.company.toLowerCase().includes(search.toLowerCase()) ||
        interview.role.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status && status !== 'all') {
      filteredInterviews = filteredInterviews.filter(interview => 
        interview.status === status
      );
    }
    
    if (difficulty && difficulty !== 'all') {
      filteredInterviews = filteredInterviews.filter(interview => 
        interview.difficulty === difficulty
      );
    }
    
    res.status(200).json({
      success: true,
      interviews: filteredInterviews,
      stats: {
        total: 24,
        scheduled: 6,
        successRate: 78,
        avgPackage: 107
      }
    });
  } catch (error) {
    console.error('Get interviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get interview by ID
// @route   GET /api/interviews/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const interview = mockInterviews.find(int => int.id == req.params.id);
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    console.error('Get interview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// AI Interview Routes
// @desc    Start AI Interview
// @route   POST /api/interviews/ai/:interviewId/start
// @access  Private
router.post('/ai/:interviewId/start', protect, startInterview);

// @desc    Get current question
// @route   GET /api/interviews/ai/:interviewId/question
// @access  Private
router.get('/ai/:interviewId/question', protect, getCurrentQuestion);

// @desc    Submit answer
// @route   POST /api/interviews/ai/:interviewId/answer
// @access  Private
router.post('/ai/:interviewId/answer', protect, submitAnswer);

// @desc    End interview
// @route   POST /api/interviews/ai/:interviewId/end
// @access  Private
router.post('/ai/:interviewId/end', protect, endInterview);

// @desc    Get interview history
// @route   GET /api/interviews/history
// @access  Private
router.get('/history', protect, getInterviewHistory);

module.exports = router;