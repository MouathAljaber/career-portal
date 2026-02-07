const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/talent-pool
// @desc    Get all students (talent pool) with filters - Company only
// @access  Private (Company only)
router.get('/', protect, async (req, res) => {
  try {
    // Check if user is a company
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can access talent pool',
      });
    }

    const {
      search,
      major,
      university,
      skills,
      year,
      minGPA,
      location,
      sortBy = 'recent',
      page = 1,
      limit = 20,
    } = req.query;

    // Build query
    let query = { user: { $exists: true } };

    // Search filter (name, email, bio, skills)
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Major filter
    if (major) {
      query.major = { $regex: major, $options: 'i' };
    }

    // University filter
    if (university) {
      query.university = { $regex: university, $options: 'i' };
    }

    // Year filter
    if (year) {
      query.year = year;
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Skills filter (at least one skill match)
    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim());
      query.skills = { $in: skillArray };
    }

    // GPA filter
    if (minGPA) {
      query.gpa = { $gte: Number(minGPA) };
    }

    // Build sort
    let sort = { createdAt: -1 }; // Default: newest first
    if (sortBy === 'gpa-high') sort = { gpa: -1 };
    if (sortBy === 'gpa-low') sort = { gpa: 1 };
    if (sortBy === 'name-asc') sort = { firstName: 1, lastName: 1 };
    if (sortBy === 'name-desc') sort = { firstName: -1, lastName: -1 };

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const students = await StudentProfile.find(query)
      .populate('user', 'email')
      .sort(sort)
      .limit(Number(limit))
      .skip(skip)
      .select('-experience -projects -certifications -achievements'); // Exclude detailed fields for list view

    const total = await StudentProfile.countDocuments(query);

    res.json({
      success: true,
      count: students.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: students,
    });
  } catch (error) {
    console.error('Error fetching talent pool:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching talent pool',
      error: error.message,
    });
  }
});

// @route   GET /api/talent-pool/:studentId
// @desc    Get detailed student profile - Company only
// @access  Private (Company only)
router.get('/:studentId', protect, async (req, res) => {
  try {
    // Check if user is a company
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can access student profiles',
      });
    }

    const student = await StudentProfile.findById(req.params.studentId).populate(
      'user',
      'email createdAt'
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found',
      });
    }

    // Get additional stats
    const applicationStats = {
      totalApplied: 0, // Would query applications in future
      pending: 0,
      reviewing: 0,
      interviewed: 0,
      accepted: 0,
    };

    res.json({
      success: true,
      data: {
        ...student.toObject(),
        applicationStats,
      },
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student profile',
      error: error.message,
    });
  }
});

// @route   GET /api/talent-pool/stats/filters
// @desc    Get filter options for talent pool
// @access  Private (Company only)
router.get('/stats/filters', protect, async (req, res) => {
  try {
    // Check if user is a company
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can access this resource',
      });
    }

    // Get unique values for filters
    const [majors, universities, years, skills] = await Promise.all([
      StudentProfile.distinct('major'),
      StudentProfile.distinct('university'),
      StudentProfile.distinct('year'),
      StudentProfile.aggregate([
        { $unwind: '$skills' },
        { $group: { _id: '$skills' } },
        { $sort: { _id: 1 } },
        { $limit: 30 },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        majors: majors.filter(m => m),
        universities: universities.filter(u => u),
        years: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'],
        skills: skills.map(s => s._id),
      },
    });
  } catch (error) {
    console.error('Error fetching filter stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter stats',
      error: error.message,
    });
  }
});

module.exports = router;
