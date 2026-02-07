const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    // Personal Information
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    nationality: {
      type: String,
      trim: true,
    },

    // Academic Information
    university: {
      type: String,
      trim: true,
    },
    degree: {
      type: String,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'],
      default: '1st Year',
    },
    gpa: {
      type: Number,
      min: 0,
      max: 4.0,
    },
    expectedGraduation: {
      type: Date,
    },

    // Professional Information
    bio: {
      type: String,
      maxlength: 500,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    languages: [
      {
        language: String,
        proficiency: {
          type: String,
          enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
        },
      },
    ],

    // Experience
    experience: [
      {
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        current: {
          type: Boolean,
          default: false,
        },
        description: String,
      },
    ],

    // Education History
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        current: {
          type: Boolean,
          default: false,
        },
        grade: String,
      },
    ],

    // Documents
    resume: {
      filename: String,
      url: String,
      uploadedAt: Date,
    },

    // Bookmarks
    savedInternships: [
      {
        internship: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Internship',
        },
        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Application History (references to applications in Internship model)
    applications: [
      {
        internship: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Internship',
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['pending', 'reviewed', 'interview', 'accepted', 'rejected'],
          default: 'pending',
        },
      },
    ],

    // Social Links
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
    },

    // Settings
    profileVisibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },

    // Stats
    profileViews: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
studentProfileSchema.index({ user: 1 });
studentProfileSchema.index({ university: 1 });
studentProfileSchema.index({ skills: 1 });

// Virtual for full name
studentProfileSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

// Virtual for applications count
studentProfileSchema.virtual('applicationsCount').get(function () {
  return this.applications ? this.applications.length : 0;
});

// Virtual for bookmarks count
studentProfileSchema.virtual('bookmarksCount').get(function () {
  return this.savedInternships ? this.savedInternships.length : 0;
});

// Ensure virtuals are included in JSON
studentProfileSchema.set('toJSON', { virtuals: true });
studentProfileSchema.set('toObject', { virtuals: true });

// Method to add bookmark
studentProfileSchema.methods.addBookmark = async function (internshipId) {
  const exists = this.savedInternships.find(
    saved => saved.internship.toString() === internshipId.toString()
  );

  if (!exists) {
    this.savedInternships.push({
      internship: internshipId,
      savedAt: Date.now(),
    });
    await this.save();
  }
  return this;
};

// Method to remove bookmark
studentProfileSchema.methods.removeBookmark = async function (internshipId) {
  this.savedInternships = this.savedInternships.filter(
    saved => saved.internship.toString() !== internshipId.toString()
  );
  await this.save();
  return this;
};

// Method to add application
studentProfileSchema.methods.addApplication = async function (internshipId, status = 'pending') {
  const exists = this.applications.find(
    app => app.internship.toString() === internshipId.toString()
  );

  if (!exists) {
    this.applications.push({
      internship: internshipId,
      appliedAt: Date.now(),
      status: status,
    });
    await this.save();
  }
  return this;
};

// Method to update application status
studentProfileSchema.methods.updateApplicationStatus = async function (internshipId, status) {
  const application = this.applications.find(
    app => app.internship.toString() === internshipId.toString()
  );

  if (application) {
    application.status = status;
    await this.save();
  }
  return this;
};

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
