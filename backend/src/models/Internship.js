const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide internship title'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    logo: {
      type: String,
      default: 'C',
    },
    logoColor: {
      type: String,
      default: 'bg-blue-500',
    },
    description: {
      type: String,
      required: [true, 'Please provide internship description'],
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Please provide duration'],
      trim: true,
    },
    stipend: {
      type: Number,
      required: [true, 'Please provide stipend amount'],
      min: 0,
    },
    type: {
      type: String,
      enum: ['On-site', 'Remote', 'Hybrid'],
      required: [true, 'Please specify work type'],
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    responsibilities: [
      {
        type: String,
      },
    ],
    applicants: {
      type: Number,
      default: 0,
    },
    applications: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
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
        resume: String,
        coverLetter: String,
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    deadline: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
internshipSchema.index({
  title: 'text',
  company: 'text',
  description: 'text',
  tags: 'text',
});

// Virtual for posted time
internshipSchema.virtual('posted').get(function () {
  const now = new Date();
  const diff = now - this.createdAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
});

internshipSchema.set('toJSON', { virtuals: true });
internshipSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Internship', internshipSchema);
