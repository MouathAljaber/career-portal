const express = require('express');
const {
  getStudentDashboard,
  getProfile,
  updateProfile,
  toggleBookmark,
  getBookmarks,
  getApplications,
  getStats,
  uploadResume,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Dashboard
router.get('/dashboard', protect, authorize('student'), getStudentDashboard);

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Bookmark routes
router.post('/bookmarks/:internshipId', protect, toggleBookmark);
router.get('/bookmarks', protect, getBookmarks);

// Application routes
router.get('/applications', protect, getApplications);

// Stats
router.get('/stats', protect, getStats);

// Resume upload
router.post('/resume', protect, uploadResume);

module.exports = router;
