const express = require('express');
const { protect } = require('../middleware/auth');
const {
  upload,
  getResumes,
  getResume,
  uploadResume,
  updateResume,
  deleteResume,
  chatWithAI,
  analyzeResume,
  updateResumeSection
} = require('../controllers/resumeController');

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get all resumes for user
// @route   GET /api/resumes
router.get('/', getResumes);

// @desc    Upload and parse resume file
// @route   POST /api/resumes/upload
router.post('/upload', upload.single('resume'), uploadResume);

// @desc    Get, Update, Delete specific resume
// @route   GET /api/resumes/:id, PUT /api/resumes/:id, DELETE /api/resumes/:id
router.route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

// @desc    AI Chat with resume
// @route   POST /api/resumes/:id/chat
router.post('/:id/chat', chatWithAI);

// @desc    AI Analysis of resume
// @route   POST /api/resumes/:id/analyze
router.post('/:id/analyze', analyzeResume);

// @desc    Update resume section in real-time
// @route   PUT /api/resumes/:id/section
router.put('/:id/section', updateResumeSection);

module.exports = router;