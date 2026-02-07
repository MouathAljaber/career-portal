import { internshipAPI } from './api';

// Local fallback data for demo/offline mode
let internships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'Google',
    logo: 'G',
    logoColor: 'bg-blue-500',
    location: 'Berlin',
    category: 'Technology',
    duration: '6 months',
    durationId: '5-6',
    stipend: 1200,
    type: 'On-site',
    workType: 'onsite',
    applicants: 234,
    posted: '2 days ago',
    tags: ['React', 'Node.js', 'TypeScript'],
    isHot: true,
    isNew: true,
  },
  {
    id: 2,
    title: 'Product Design Intern',
    company: 'Microsoft',
    logo: 'M',
    logoColor: 'bg-emerald-500',
    location: 'Berlin',
    category: 'Design',
    duration: '3 months',
    durationId: '3-4',
    stipend: 1000,
    type: 'Hybrid',
    workType: 'hybrid',
    applicants: 156,
    posted: '1 week ago',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    isHot: false,
    isNew: false,
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'Amazon',
    logo: 'A',
    logoColor: 'bg-orange-500',
    location: 'Berlin',
    category: 'Technology',
    duration: '4 months',
    durationId: '3-4',
    stipend: 1300,
    type: 'Remote',
    workType: 'remote',
    applicants: 312,
    posted: '3 days ago',
    tags: ['Python', 'ML', 'SQL'],
    isHot: true,
    isNew: true,
  },
  {
    id: 4,
    title: 'Marketing Intern',
    company: 'BMW',
    logo: 'B',
    logoColor: 'bg-yellow-500',
    location: 'Munich',
    category: 'Marketing',
    duration: '3 months',
    durationId: '3-4',
    stipend: 900,
    type: 'On-site',
    workType: 'onsite',
    applicants: 89,
    posted: '5 days ago',
    tags: ['Digital Marketing', 'SEO', 'Analytics'],
    isHot: false,
    isNew: false,
  },
  {
    id: 5,
    title: 'Frontend Developer Intern',
    company: 'SAP',
    logo: 'S',
    logoColor: 'bg-blue-600',
    location: 'Berlin',
    category: 'Technology',
    duration: '6 months',
    durationId: '5-6',
    stipend: 1100,
    type: 'Hybrid',
    workType: 'hybrid',
    applicants: 178,
    posted: '1 day ago',
    tags: ['React', 'CSS', 'JavaScript'],
    isHot: true,
    isNew: true,
  },
  {
    id: 6,
    title: 'Business Analyst Intern',
    company: 'Siemens',
    logo: 'S',
    logoColor: 'bg-orange-600',
    location: 'Frankfurt',
    category: 'Business',
    duration: '4 months',
    durationId: '3-4',
    stipend: 950,
    type: 'On-site',
    workType: 'onsite',
    applicants: 124,
    posted: '4 days ago',
    tags: ['Excel', 'SQL', 'Strategy'],
    isHot: false,
    isNew: false,
  },
  {
    id: 7,
    title: 'UX Research Intern',
    company: 'Zalando',
    logo: 'Z',
    logoColor: 'bg-pink-500',
    location: 'Berlin',
    category: 'Design',
    duration: '4 months',
    durationId: '3-4',
    stipend: 950,
    type: 'Remote',
    workType: 'remote',
    applicants: 92,
    posted: '3 days ago',
    tags: ['User Research', 'Testing', 'Analytics'],
    isHot: false,
    isNew: true,
  },
  {
    id: 8,
    title: 'Finance Analyst Intern',
    company: 'Deutsche Bank',
    logo: 'DB',
    logoColor: 'bg-green-600',
    location: 'Frankfurt',
    category: 'Finance',
    duration: '6 months',
    durationId: '5-6',
    stipend: 1400,
    type: 'On-site',
    workType: 'onsite',
    applicants: 245,
    posted: '1 week ago',
    tags: ['Financial Modeling', 'Excel', 'Bloomberg'],
    isHot: true,
    isNew: false,
  },
  {
    id: 9,
    title: 'DevOps Intern',
    company: 'Bosch',
    logo: 'B',
    logoColor: 'bg-red-500',
    location: 'Stuttgart',
    category: 'Technology',
    duration: '5 months',
    durationId: '5-6',
    stipend: 1050,
    type: 'Hybrid',
    workType: 'hybrid',
    applicants: 167,
    posted: '2 days ago',
    tags: ['Docker', 'Kubernetes', 'AWS'],
    isHot: true,
    isNew: true,
  },
  {
    id: 10,
    title: 'Content Marketing Intern',
    company: 'Adidas',
    logo: 'A',
    logoColor: 'bg-black',
    location: 'Hamburg',
    category: 'Marketing',
    duration: '3 months',
    durationId: '3-4',
    stipend: 850,
    type: 'Hybrid',
    workType: 'hybrid',
    applicants: 103,
    posted: '5 days ago',
    tags: ['Content', 'Social Media', 'SEO'],
    isHot: false,
    isNew: false,
  },
  {
    id: 11,
    title: 'Mobile App Developer Intern',
    company: 'Spotify',
    logo: 'S',
    logoColor: 'bg-green-500',
    location: 'Hamburg',
    category: 'Technology',
    duration: '6 months',
    durationId: '5-6',
    stipend: 1250,
    type: 'Remote',
    workType: 'remote',
    applicants: 289,
    posted: '1 day ago',
    tags: ['React Native', 'iOS', 'Android'],
    isHot: true,
    isNew: true,
  },
  {
    id: 12,
    title: 'Graphic Design Intern',
    company: 'Lufthansa',
    logo: 'L',
    logoColor: 'bg-blue-700',
    location: 'Cologne',
    category: 'Design',
    duration: '4 months',
    durationId: '3-4',
    stipend: 900,
    type: 'On-site',
    workType: 'onsite',
    applicants: 78,
    posted: '1 week ago',
    tags: ['Photoshop', 'Illustrator', 'Branding'],
    isHot: false,
    isNew: false,
  },
  {
    id: 13,
    title: 'Data Engineer Intern',
    company: 'Volkswagen',
    logo: 'VW',
    logoColor: 'bg-blue-800',
    location: 'Hamburg',
    category: 'Technology',
    duration: '5 months',
    durationId: '5-6',
    stipend: 1150,
    type: 'On-site',
    workType: 'onsite',
    applicants: 198,
    posted: '3 days ago',
    tags: ['SQL', 'Python', 'ETL'],
    isHot: true,
    isNew: true,
  },
  {
    id: 14,
    title: 'Investment Banking Intern',
    company: 'Goldman Sachs',
    logo: 'GS',
    logoColor: 'bg-gray-800',
    location: 'Frankfurt',
    category: 'Finance',
    duration: '3 months',
    durationId: '3-4',
    stipend: 1600,
    type: 'On-site',
    workType: 'onsite',
    applicants: 412,
    posted: '2 days ago',
    tags: ['M&A', 'Valuation', 'Excel'],
    isHot: true,
    isNew: true,
  },
  {
    id: 15,
    title: 'Remote Tech Support Intern',
    company: 'Microsoft',
    logo: 'M',
    logoColor: 'bg-cyan-500',
    location: 'Remote',
    category: 'Technology',
    duration: '4 months',
    durationId: '3-4',
    stipend: 800,
    type: 'Remote',
    workType: 'remote',
    applicants: 145,
    posted: '1 week ago',
    tags: ['Support', 'Troubleshooting', 'Windows'],
    isHot: false,
    isNew: false,
  },
];

// Get all internships
export const getAllInternships = () => {
  return internships;
};

// Calculate location counts
export const getLocationCounts = () => {
  const counts = {};
  internships.forEach(intern => {
    const location = intern.location.toLowerCase();
    counts[location] = (counts[location] || 0) + 1;
  });
  return counts;
};

// Calculate category counts
export const getCategoryCounts = () => {
  const counts = {};
  internships.forEach(intern => {
    const category = intern.category;
    counts[category] = (counts[category] || 0) + 1;
  });
  return counts;
};

// Calculate work type counts
export const getWorkTypeCounts = () => {
  const counts = {};
  internships.forEach(intern => {
    counts[intern.workType] = (counts[intern.workType] || 0) + 1;
  });
  return counts;
};

// Calculate duration counts
export const getDurationCounts = () => {
  const counts = {};
  internships.forEach(intern => {
    counts[intern.durationId] = (counts[intern.durationId] || 0) + 1;
  });
  return counts;
};

// Get internship by ID
export const getInternshipById = id => {
  return internships.find(intern => intern.id === id);
};

// Increment applicants count
export const incrementApplicants = jobId => {
  const internship = internships.find(intern => intern.id === jobId);
  if (internship) {
    internship.applicants += 1;
    // In production, this would be an API call to update the backend
    return true;
  }
  return false;
};

// Get applicants count
export const getApplicantsCount = jobId => {
  const internship = internships.find(intern => intern.id === jobId);
  return internship ? internship.applicants : 0;
};

// ==================== API INTEGRATION ====================

// Fetch all internships from backend with filters
export const fetchInternships = async (filters = {}) => {
  try {
    const response = await internshipAPI.getAll(filters);
    if (response.success && response.data) {
      // Update local cache
      internships = response.data.map(intern => ({
        ...intern,
        id: intern._id || intern.id,
        workType: intern.type,
        durationId: intern.duration,
      }));
      return internships;
    }
  } catch (error) {
    console.error('Failed to fetch from backend, using local data:', error);
  }
  // Return local fallback data if API fails
  return internships;
};

// Initialize - try to load from backend on startup
let initialized = false;
export const initializeInternships = async () => {
  if (!initialized) {
    initialized = true;
    await fetchInternships();
  }
};
