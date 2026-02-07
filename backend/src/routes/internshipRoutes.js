const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const StudentProfile = require('../models/StudentProfile');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/internships
// @desc    Get all active internships with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      location,
      category,
      type,
      minStipend,
      maxStipend,
      duration,
      sortBy,
      page = 1,
      limit = 20,
    } = req.query;

    // Build query
    let query = { isActive: true };

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Category filter
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Work type filter
    if (type) {
      query.type = type;
    }

    // Stipend range filter
    if (minStipend || maxStipend) {
      query.stipend = {};
      if (minStipend) query.stipend.$gte = Number(minStipend);
      if (maxStipend) query.stipend.$lte = Number(maxStipend);
    }

    // Duration filter
    if (duration) {
      query.duration = { $regex: duration, $options: 'i' };
    }

    // Build sort
    let sort = { createdAt: -1 }; // Default: newest first
    if (sortBy === 'stipend-high') sort = { stipend: -1 };
    if (sortBy === 'stipend-low') sort = { stipend: 1 };
    if (sortBy === 'applicants') sort = { applicants: -1 };

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const internships = await Internship.find(query)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip)
      .select('-applications'); // Don't send applications array in list

    const total = await Internship.countDocuments(query);

    res.json({
      success: true,
      count: internships.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: internships,
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching internships',
      error: error.message,
    });
  }
});

// @route   GET /api/internships/:id
// @desc    Get single internship by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('postedBy', 'name email')
      .select('-applications'); // Don't send applications to public

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    res.json({
      success: true,
      data: internship,
    });
  } catch (error) {
    console.error('Error fetching internship:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching internship',
      error: error.message,
    });
  }
});

// @route   POST /api/internships
// @desc    Create new internship (Company only)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // Check if user is a company
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can post internships',
      });
    }

    const internshipData = {
      ...req.body,
      postedBy: req.user.id,
      companyEmail: req.user.email,
      company: req.user.name, // Use company name from user profile
    };

    const internship = await Internship.create(internshipData);

    res.status(201).json({
      success: true,
      message: 'Internship posted successfully',
      data: internship,
    });
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating internship',
      error: error.message,
    });
  }
});

// @route   PUT /api/internships/:id
// @desc    Update internship (Company owner only)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    // Check ownership
    if (internship.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this internship',
      });
    }

    // Update fields
    const allowedUpdates = [
      'title',
      'description',
      'location',
      'duration',
      'stipend',
      'type',
      'category',
      'tags',
      'requirements',
      'responsibilities',
      'isActive',
      'isHot',
      'deadline',
      'startDate',
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        internship[field] = req.body[field];
      }
    });

    await internship.save();

    res.json({
      success: true,
      message: 'Internship updated successfully',
      data: internship,
    });
  } catch (error) {
    console.error('Error updating internship:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating internship',
      error: error.message,
    });
  }
});

// @route   DELETE /api/internships/:id
// @desc    Delete internship (soft delete - mark as inactive)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    // Check ownership
    if (internship.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this internship',
      });
    }

    // Soft delete
    internship.isActive = false;
    await internship.save();

    res.json({
      success: true,
      message: 'Internship deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting internship:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting internship',
      error: error.message,
    });
  }
});

// @route   POST /api/internships/:id/apply
// @desc    Apply to internship (Student only)
// @access  Private
router.post('/:id/apply', protect, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can apply to internships',
      });
    }

    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    if (!internship.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This internship is no longer active',
      });
    }

    // Check if already applied
    const alreadyApplied = internship.applications.some(
      app => app.studentId.toString() === req.user.id
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this internship',
      });
    }

    // Add application
    internship.applications.push({
      studentId: req.user.id,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter,
      status: 'pending',
    });

    internship.applicants += 1;
    await internship.save();

    // Also update student profile
    try {
      let studentProfile = await StudentProfile.findOne({ user: req.user.id });

      if (!studentProfile) {
        studentProfile = await StudentProfile.create({
          user: req.user.id,
          firstName: req.user.name?.split(' ')[0] || '',
          lastName: req.user.name?.split(' ').slice(1).join(' ') || '',
        });
      }

      // Add to applications if not already there
      const alreadyInProfile = studentProfile.applications.some(
        app => app.internship.toString() === req.params.id
      );

      if (!alreadyInProfile) {
        studentProfile.applications.push({
          internship: req.params.id,
          appliedAt: Date.now(),
          status: 'pending',
        });
        await studentProfile.save();
      }
    } catch (profileError) {
      console.error('Error updating student profile:', profileError);
      // Don't fail the application if profile update fails
    }

    res.json({
      success: true,
      message: 'Application submitted successfully',
      applicants: internship.applicants,
    });
  } catch (error) {
    console.error('Error applying to internship:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message,
    });
  }
});

// @route   GET /api/internships/:id/applications
// @desc    Get applications for a company internship
// @access  Private (Company only)
router.get('/:id/applications', protect, async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can access applications',
      });
    }

    const internship = await Internship.findById(req.params.id)
      .populate('applications.studentId', 'email')
      .select('applications postedBy title');

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    if (internship.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view applications',
      });
    }

    const applications = internship.applications.map(app => ({
      id: app._id,
      status: app.status,
      appliedAt: app.appliedAt,
      resume: app.resume,
      coverLetter: app.coverLetter,
      student: app.studentId
        ? {
            id: app.studentId._id,
            email: app.studentId.email,
            firstName: app.studentId.firstName,
            lastName: app.studentId.lastName,
            phone: app.studentId.phone,
          }
        : null,
    }));

    return res.json({
      success: true,
      data: applications,
      count: applications.length,
      internshipTitle: internship.title,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching applications',
    });
  }
});

// @route   PATCH /api/internships/:id/applications/:applicationId/status
// @desc    Update application status (Company only)
// @access  Private
router.patch('/:id/applications/:applicationId/status', protect, async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can update application status',
      });
    }

    const { status } = req.body;
    const allowedStatuses = ['pending', 'reviewed', 'interview', 'accepted', 'rejected'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    if (internship.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update applications',
      });
    }

    const application = internship.applications.id(req.params.applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    application.status = status;
    await internship.save();

    try {
      const studentProfile = await StudentProfile.findOne({ user: application.studentId });
      if (studentProfile) {
        await studentProfile.updateApplicationStatus(req.params.id, status);
      }
    } catch (profileError) {
      console.error('Error updating student profile status:', profileError);
    }

    return res.json({
      success: true,
      message: 'Application status updated',
      data: {
        id: application._id,
        status: application.status,
      },
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating application status',
    });
  }
});

// @route   GET /api/internships/company/my-internships
// @desc    Get internships posted by logged-in company
// @access  Private (Company only)
router.get('/company/my-internships', protect, async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can access this route',
      });
    }

    const internships = await Internship.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 })
      .populate('applications.studentId', 'name email phone');

    res.json({
      success: true,
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    console.error('Error fetching company internships:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching internships',
      error: error.message,
    });
  }
});

// @route   GET /api/internships/stats/counts
// @desc    Get counts for filters (locations, categories, work types, durations)
// @access  Public
router.get('/stats/counts', async (req, res) => {
  try {
    const [locations, categories, workTypes, durations] = await Promise.all([
      // Location counts
      Internship.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$location', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Category counts
      Internship.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Work type counts
      Internship.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Duration counts
      Internship.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$duration', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        locations: locations.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        categories: categories.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        workTypes: workTypes.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        durations: durations.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message,
    });
  }
});

module.exports = router;
