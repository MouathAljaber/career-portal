const { mentors } = require('../data/recommendations');

// @desc    Get available mentors
// @route   GET /api/mentors
// @access  Private (authenticated users)
exports.getMentors = async (_req, res) => {
  try {
    return res.json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    console.error('Get mentors error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load mentors' });
  }
};
