const User = require('../models/User')

// @desc    Get user statistics
// @route   GET /api/users/stats  
// @access  Private
const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id

    // Get basic user info
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Calculate stats (mock data for now, you can implement real logic later)
    const stats = {
      recentInterviews: Math.floor(Math.random() * 10) + 1,
      upcomingMock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      latestScore: Math.floor(Math.random() * 40) + 60, // 60-100
      completedTests: Math.floor(Math.random() * 20) + 1
    }

    res.json(stats)
  } catch (error) {
    console.error('Get user stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get user progress
// @route   GET /api/users/progress
// @access  Private  
const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Mock progress data (implement real logic later)
    const progress = {
      totalInterviews: Math.floor(Math.random() * 20) + 1,
      passedInterviews: Math.floor(Math.random() * 15) + 1,
      averageScore: Math.floor(Math.random() * 40) + 60,
      skillLevels: {
        technical: Math.floor(Math.random() * 100),
        communication: Math.floor(Math.random() * 100),
        problemSolving: Math.floor(Math.random() * 100),
        leadership: Math.floor(Math.random() * 100)
      },
      recentActivity: [
        {
          type: 'interview',
          title: 'Google Software Engineer Interview',
          date: new Date().toISOString(),
          score: 85
        },
        {
          type: 'test', 
          title: 'Data Structures Quiz',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          score: 92
        }
      ]
    }

    res.json(progress)
  } catch (error) {
    console.error('Get user progress error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Update user progress
// @route   PUT /api/users/progress
// @access  Private
const updateUserProgress = async (req, res) => {
  try {
    const userId = req.user.id
    const { interviewId, score, skills } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Here you would implement real progress tracking logic
    // For now, just return success
    res.json({ 
      message: 'Progress updated successfully',
      interviewId,
      score,
      skills 
    })
  } catch (error) {
    console.error('Update user progress error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getUserStats,
  getUserProgress,
  updateUserProgress
}