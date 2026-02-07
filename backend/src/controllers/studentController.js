const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const Internship = require('../models/Internship');
const { internships, mentors } = require('../data/recommendations');

const normalizeSkills = (skills = []) =>
  skills.map(skill => skill?.toString().trim().toLowerCase()).filter(Boolean);

const scoreInternships = studentSkills => {
  const normalizedSkills = normalizeSkills(studentSkills);

  return internships
    .map(internship => {
      const internshipSkills = normalizeSkills(internship.skills);
      const sharedSkills = internshipSkills.filter(skill => normalizedSkills.includes(skill));
      const matchScore = internshipSkills.length
        ? Math.round((sharedSkills.length / internshipSkills.length) * 100)
        : 0;

      return {
        ...internship,
        matchScore,
        sharedSkills,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
};

const selectMentorshipHighlights = studentSkills => {
  const normalizedSkills = normalizeSkills(studentSkills);

  return mentors
    .map(mentor => {
      const mentorSkills = normalizeSkills(mentor.skills);
      const sharedSkills = mentorSkills.filter(skill => normalizedSkills.includes(skill));

      return {
        ...mentor,
        sharedSkills,
        matchScore: sharedSkills.length,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
};

// @desc    Student dashboard data with recommendations
// @route   GET /api/student/dashboard
// @access  Private (students only)
exports.getStudentDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role !== 'student') {
      return res
        .status(403)
        .json({ success: false, message: 'Dashboard available for students only' });
    }

    const studentSkills = normalizeSkills(user.skills);
    const recommendedInternships = scoreInternships(studentSkills);
    const mentorshipHighlights = selectMentorshipHighlights(studentSkills);

    return res.json({
      success: true,
      data: {
        student: {
          id: user._id,
          email: user.email,
          role: user.role,
          skills: studentSkills,
        },
        stats: {
          skillsTracked: studentSkills.length,
          totalRecommendations: recommendedInternships.length,
          mentorMatches: mentorshipHighlights.length,
        },
        recommendedInternships,
        mentorshipHighlights,
      },
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load dashboard data' });
  }
};

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private (Student only)
exports.getProfile = async (req, res) => {
  try {
    let profile = await StudentProfile.findOne({ user: req.user.id })
      .populate('savedInternships.internship')
      .populate('applications.internship');

    // If profile doesn't exist, create a new one
    if (!profile) {
      profile = await StudentProfile.create({
        user: req.user.id,
        firstName: req.user.name?.split(' ')[0] || '',
        lastName: req.user.name?.split(' ').slice(1).join(' ') || '',
        bio: '',
      });

      // Populate after creation
      profile = await StudentProfile.findById(profile._id)
        .populate('savedInternships.internship')
        .populate('applications.internship');
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
    });
  }
};

// @desc    Update student profile
// @route   PUT /api/students/profile
// @access  Private (Student only)
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      nationality,
      university,
      degree,
      major,
      year,
      gpa,
      expectedGraduation,
      bio,
      skills,
      languages,
      experience,
      education,
      linkedin,
      github,
      portfolio,
      profileVisibility,
      emailNotifications,
    } = req.body;

    let profile = await StudentProfile.findOne({ user: req.user.id });

    if (!profile) {
      profile = await StudentProfile.create({ user: req.user.id, ...req.body });
    } else {
      const updateFields = {
        firstName,
        lastName,
        phone,
        dateOfBirth,
        nationality,
        university,
        degree,
        major,
        year,
        gpa,
        expectedGraduation,
        bio,
        skills,
        languages,
        experience,
        education,
        linkedin,
        github,
        portfolio,
        profileVisibility,
        emailNotifications,
        lastActive: Date.now(),
      };

      Object.keys(updateFields).forEach(
        key => updateFields[key] === undefined && delete updateFields[key]
      );

      profile = await StudentProfile.findOneAndUpdate({ user: req.user.id }, updateFields, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating profile',
    });
  }
};

// @desc    Add/toggle bookmark
// @route   POST /api/students/bookmarks/:internshipId
// @access  Private (Student only)
exports.toggleBookmark = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    let profile = await StudentProfile.findOne({ user: req.user.id });

    if (!profile) {
      profile = await StudentProfile.create({
        user: req.user.id,
        firstName: req.user.name?.split(' ')[0] || '',
        lastName: req.user.name?.split(' ').slice(1).join(' ') || '',
      });
    }

    const bookmarkIndex = profile.savedInternships.findIndex(
      saved => saved.internship.toString() === internshipId
    );

    let isBookmarked = false;

    if (bookmarkIndex > -1) {
      profile.savedInternships.splice(bookmarkIndex, 1);
      isBookmarked = false;
    } else {
      profile.savedInternships.push({ internship: internshipId, savedAt: Date.now() });
      isBookmarked = true;
    }

    await profile.save();

    res.status(200).json({
      success: true,
      isBookmarked,
      message: isBookmarked ? 'Internship bookmarked' : 'Bookmark removed',
      bookmarksCount: profile.savedInternships.length,
    });
  } catch (error) {
    console.error('Toggle bookmark error:', error);
    res.status(500).json({ success: false, message: 'Error toggling bookmark' });
  }
};

// @desc    Get all bookmarked internships
// @route   GET /api/students/bookmarks
// @access  Private (Student only)
exports.getBookmarks = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id }).populate(
      'savedInternships.internship'
    );

    if (!profile) {
      return res.status(200).json({ success: true, data: [] });
    }

    const bookmarkedInternships = profile.savedInternships
      .filter(saved => saved.internship)
      .map(saved => ({
        ...saved.internship.toObject(),
        savedAt: saved.savedAt,
      }));

    res.status(200).json({
      success: true,
      count: bookmarkedInternships.length,
      data: bookmarkedInternships,
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookmarks' });
  }
};

// @desc    Get all applied internships
// @route   GET /api/students/applications
// @access  Private (Student only)
exports.getApplications = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id }).populate(
      'applications.internship'
    );

    if (!profile) {
      return res.status(200).json({ success: true, data: [] });
    }

    const applications = profile.applications
      .filter(app => app.internship)
      .map(app => ({
        ...app.internship.toObject(),
        appliedAt: app.appliedAt,
        applicationStatus: app.status,
      }));

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, message: 'Error fetching applications' });
  }
};

// @desc    Get profile stats
// @route   GET /api/students/stats
// @access  Private (Student only)
exports.getStats = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(200).json({
        success: true,
        data: {
          applicationsCount: 0,
          bookmarksCount: 0,
          profileViews: 0,
          interviewsCount: 0,
        },
      });
    }

    const interviewsCount = profile.applications.filter(app => app.status === 'interview').length;

    const stats = {
      applicationsCount: profile.applications.length,
      bookmarksCount: profile.savedInternships.length,
      profileViews: profile.profileViews || 0,
      interviewsCount,
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
};

// @desc    Upload resume
// @route   POST /api/students/resume
// @access  Private (Student only)
exports.uploadResume = async (req, res) => {
  try {
    const { filename, url } = req.body;

    if (!filename || !url) {
      return res.status(400).json({
        success: false,
        message: 'Filename and URL are required',
      });
    }

    let profile = await StudentProfile.findOne({ user: req.user.id });

    if (!profile) {
      profile = await StudentProfile.create({
        user: req.user.id,
        firstName: req.user.name?.split(' ')[0] || '',
        lastName: req.user.name?.split(' ').slice(1).join(' ') || '',
        resume: { filename, url, uploadedAt: Date.now() },
      });
    } else {
      profile.resume = { filename, url, uploadedAt: Date.now() };
      await profile.save();
    }

    res.status(200).json({
      success: true,
      data: profile.resume,
      message: 'Resume uploaded successfully',
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ success: false, message: 'Error uploading resume' });
  }
};
