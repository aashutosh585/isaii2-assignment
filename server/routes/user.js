const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user dashboard stats
// @route   GET /api/user/stats
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      stats: {
        recentInterviews: user.stats.interviewsScheduled || 5,
        upcomingMock: 'Dec 15, 2023',
        latestScore: user.stats.averageScore || 89,
        testsCompleted: user.stats.testsCompleted || 12
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;