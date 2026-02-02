import { MapPin, Clock, Euro, Users, Bookmark, ArrowRight, Zap } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { convertCurrency, formatCurrency } from '../../utils/currencyConverter';
import { useState } from 'react';
import toast from 'react-hot-toast';

const internships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'Google',
    logo: 'G',
    logoColor: 'bg-blue-500',
    location: 'Berlin',
    duration: '6 months',
    stipend: 1200,
    type: 'On-site',
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
    duration: '3 months',
    stipend: 1000,
    type: 'Hybrid',
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
    duration: '4 months',
    stipend: 1300,
    type: 'Remote',
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
    duration: '3 months',
    stipend: 900,
    type: 'On-site',
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
    duration: '6 months',
    stipend: 1100,
    type: 'Hybrid',
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
    duration: '4 months',
    stipend: 950,
    type: 'On-site',
    applicants: 124,
    posted: '4 days ago',
    tags: ['Excel', 'SQL', 'Strategy'],
    isHot: false,
    isNew: false,
  },
  {
    id: 7,
    title: 'Backend Developer Intern',
    company: 'Zalando',
    logo: 'Z',
    logoColor: 'bg-pink-500',
    location: 'Hamburg',
    duration: '6 months',
    stipend: 1250,
    type: 'Remote',
    applicants: 198,
    posted: '1 day ago',
    tags: ['Java', 'Spring', 'AWS'],
    isHot: true,
    isNew: true,
  },
  {
    id: 8,
    title: 'UX Research Intern',
    company: 'Adidas',
    logo: 'A',
    logoColor: 'bg-gray-800',
    location: 'Munich',
    duration: '4 months',
    stipend: 1050,
    type: 'Hybrid',
    applicants: 145,
    posted: '3 days ago',
    tags: ['User Research', 'Interviews', 'Figma'],
    isHot: false,
    isNew: false,
  },
  {
    id: 9,
    title: 'DevOps Intern',
    company: 'Volkswagen',
    logo: 'V',
    logoColor: 'bg-blue-700',
    location: 'Stuttgart',
    duration: '6 months',
    stipend: 1150,
    type: 'On-site',
    applicants: 167,
    posted: '2 days ago',
    tags: ['Docker', 'Kubernetes', 'CI/CD'],
    isHot: false,
    isNew: true,
  },
  {
    id: 10,
    title: 'Mobile App Developer Intern',
    company: 'Deutsche Bank',
    logo: 'DB',
    logoColor: 'bg-indigo-600',
    location: 'Frankfurt',
    duration: '5 months',
    stipend: 1400,
    type: 'Hybrid',
    applicants: 223,
    posted: '1 week ago',
    tags: ['React Native', 'iOS', 'Android'],
    isHot: true,
    isNew: false,
  },
  {
    id: 11,
    title: 'Content Writer Intern',
    company: 'Bayer',
    logo: 'B',
    logoColor: 'bg-green-600',
    location: 'Cologne',
    duration: '3 months',
    stipend: 800,
    type: 'Remote',
    applicants: 92,
    posted: '4 days ago',
    tags: ['Content', 'SEO', 'Copywriting'],
    isHot: false,
    isNew: false,
  },
  {
    id: 12,
    title: 'Machine Learning Intern',
    company: 'Bosch',
    logo: 'B',
    logoColor: 'bg-red-600',
    location: 'Stuttgart',
    duration: '6 months',
    stipend: 1350,
    type: 'On-site',
    applicants: 289,
    posted: '2 days ago',
    tags: ['TensorFlow', 'PyTorch', 'AI'],
    isHot: true,
    isNew: true,
  },
];

const FeaturedInternships = ({ filters, setFilteredCount, viewMode = 'grid' }) => {
  const { currency } = useCurrency();
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const toggleBookmark = (id) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(bId => bId !== id));
      toast.success('Removed from bookmarks');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast.success('Added to bookmarks');
    }
  };

  // Apply filters - if no filters provided, show all internships
  let filteredInternships = !filters ? internships : internships.filter((internship) => {
    // Stipend range filter
    const stipendMatch = internship.stipend >= filters.stipendRange[0] && 
                         internship.stipend <= filters.stipendRange[1];

    // Location filter - if empty array, show all
    const locationMatch = filters.locations.length === 0 || 
      filters.locations.includes(internship.location);

    // Work type filter - if empty array, show all
    const workTypeMatch = filters.workTypes.length === 0 || 
      filters.workTypes.includes(internship.type);

    // Duration filter - if empty array, show all
    const durationMatch = filters.durations.length === 0 || 
      filters.durations.some(d => internship.duration.includes(d));

    // Actively hiring filter (isHot or isNew)
    const activelyHiringMatch = !filters.activelyHiring || internship.isHot || internship.isNew;

    return stipendMatch && locationMatch && workTypeMatch && durationMatch && activelyHiringMatch;
  });

  // Apply sorting
  if (filters && filters.sortBy) {
    filteredInternships = [...filteredInternships].sort((a, b) => {
      switch (filters.sortBy) {
        case 'stipend-high':
          return b.stipend - a.stipend;
        case 'stipend-low':
          return a.stipend - b.stipend;
        case 'applicants':
          return b.applicants - a.applicants;
        case 'latest':
        default:
          return 0; // Keep original order for latest
      }
    });
  }

  // Update filtered count
  if (setFilteredCount) {
    setFilteredCount(filteredInternships.length);
  }

  return (
    <div>
      {filteredInternships.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No internships match your filters.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filter criteria.</p>
        </div>
      ) : (
        <div className={viewMode === 'list' ? 'space-y-4' : 'grid md:grid-cols-2 gap-4'}>
          {filteredInternships.map((internship, index) => (
          <div
            key={internship.id}
            className={`group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 ${
              viewMode === 'list' ? 'p-6' : 'p-5'
            }`}
            style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0 }}
          >
            {viewMode === 'list' ? (
              /* List View Layout */
              <div className="flex items-center gap-6">
                {/* Logo */}
                <div className={`w-14 h-14 rounded-xl ${internship.logoColor} flex items-center justify-center text-white font-bold text-xl shadow-sm shrink-0`}>
                  {internship.logo}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {internship.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{internship.company}</p>
                    </div>
                    <button 
                      onClick={() => toggleBookmark(internship.id)}
                      className={`p-2 rounded-lg transition-colors shrink-0 ${
                        bookmarkedIds.includes(internship.id)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(internship.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap mb-3">
                    {/* Badges */}
                    {internship.isHot && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                        <Zap className="w-3 h-3" />
                        Actively Hiring
                      </span>
                    )}
                    {internship.isNew && (
                      <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        New
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {internship.type}
                    </span>

                    {/* Location & Duration */}
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{internship.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Tags */}
                      {internship.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-sm text-gray-600">
                        <Users className="w-4 h-4 inline mr-1" />
                        {internship.applicants} applicants
                      </div>
                      <div className="font-semibold text-green-600">
                        <Euro className="w-4 h-4 inline mr-1" />
                        {formatCurrency(convertCurrency(internship.stipend, 'EUR', currency.code), currency.symbol)}/month
                      </div>
                      <div className="text-xs text-gray-500">
                        Posted {internship.posted}
                      </div>
                      <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium text-sm whitespace-nowrap">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Grid View Layout */
              <>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${internship.logoColor} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                  {internship.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {internship.title}
                  </h3>
                  <p className="text-sm text-gray-600">{internship.company}</p>
                </div>
              </div>
              <button 
                onClick={() => toggleBookmark(internship.id)}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarkedIds.includes(internship.id)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(internship.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {internship.isHot && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-700 border border-orange-200 text-xs rounded-full font-medium">
                  <Zap className="w-3 h-3" />
                  Actively Hiring
                </span>
              )}
              {internship.isNew && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 text-xs rounded-full font-medium">
                  New
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200 text-xs rounded-full font-medium">
                {internship.type}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="truncate">{internship.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{internship.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Euro className="w-4 h-4 shrink-0" />
                <span className="font-semibold text-green-600">
                  {formatCurrency(convertCurrency(internship.stipend, 'EUR', currency.code), currency.symbol)}/month
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4 shrink-0" />
                <span>{internship.applicants} applicants</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {internship.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 bg-gray-100 text-xs text-gray-700 rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-600">Posted {internship.posted}</span>
              <button className="h-8 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium text-sm flex items-center gap-1.5">
                Apply Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            </>
            )}
          </div>
        ))}
        </div>
      )}

      {/* Load More */}
      {filteredInternships.length > 0 && (
      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-900 transition-colors">
          Load More Internships
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedInternships;

