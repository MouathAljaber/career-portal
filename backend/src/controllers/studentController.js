const User = require('../models/User');
const { internships, mentors } = require('../data/recommendations');

const normalizeSkills = (skills = []) =>
  skills
    .map(skill => skill?.toString().trim().toLowerCase())
    .filter(Boolean);

const scoreInternships = (studentSkills) => {
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

const selectMentorshipHighlights = (studentSkills) => {
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
      return res.status(403).json({ success: false, message: 'Dashboard available for students only' });
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
