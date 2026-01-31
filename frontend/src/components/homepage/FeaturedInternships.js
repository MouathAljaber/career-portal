import { MapPin, Clock, Euro, Users, Bookmark, ArrowRight, Zap } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const internships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'Google',
    logo: 'G',
    logoColor: 'bg-blue-500',
    location: 'Bangalore',
    duration: '6 months',
    stipend: '€80,000/month',
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
    location: 'Hyderabad',
    duration: '3 months',
    stipend: '€60,000/month',
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
    location: 'Remote',
    duration: '4 months',
    stipend: '€50,000/month',
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
    company: 'Flipkart',
    logo: 'F',
    logoColor: 'bg-yellow-500',
    location: 'Bangalore',
    duration: '3 months',
    stipend: '€25,000/month',
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
    company: 'Razorpay',
    logo: 'R',
    logoColor: 'bg-blue-600',
    location: 'Bangalore',
    duration: '6 months',
    stipend: '€45,000/month',
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
    company: 'Swiggy',
    logo: 'S',
    logoColor: 'bg-orange-600',
    location: 'Bangalore',
    duration: '4 months',
    stipend: '€35,000/month',
    type: 'On-site',
    applicants: 124,
    posted: '4 days ago',
    tags: ['Excel', 'SQL', 'Strategy'],
    isHot: false,
    isNew: false,
  },
];

const FeaturedInternships = () => {
  const { currency } = useCurrency();

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        {internships.map((internship, index) => (
          <div
            key={internship.id}
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
            style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0 }}
          >
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
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Bookmark className="w-4 h-4" />
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
                <span>{internship.stipend}</span>
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
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-900 transition-colors">
          Load More Internships
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

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

