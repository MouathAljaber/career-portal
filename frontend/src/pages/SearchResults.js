import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Euro, Users, Bookmark, ArrowRight, Home, ChevronUp } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { useState } from 'react';

const searchInternships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'SAP',
    logo: 'S',
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
    company: 'SoundCloud',
    logo: 'SC',
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
    company: 'Zalando',
    logo: 'Z',
    logoColor: 'bg-orange-500',
    location: 'Berlin',
    duration: '4 months',
    stipend: 1300,
    type: 'Hybrid',
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
    company: 'SoundCloud',
    logo: 'SC',
    logoColor: 'bg-blue-600',
    location: 'Berlin',
    duration: '6 months',
    stipend: 1100,
    type: 'Remote',
    applicants: 178,
    posted: '1 day ago',
    tags: ['Vue.js', 'Tailwind', 'JavaScript'],
    isHot: false,
    isNew: true,
  },
  {
    id: 6,
    title: 'UX Research Intern',
    company: 'Zalando',
    logo: 'Z',
    logoColor: 'bg-pink-500',
    location: 'Berlin',
    duration: '4 months',
    stipend: 950,
    type: 'Remote',
    applicants: 92,
    posted: '4 days ago',
    tags: ['User Research', 'Interviews', 'Analytics'],
    isHot: true,
    isNew: false,
  },
  {
    id: 7,
    title: 'Finance Analyst Intern',
    company: 'Commerzbank',
    logo: 'C',
    logoColor: 'bg-red-500',
    location: 'Frankfurt',
    duration: '5 months',
    stipend: 1050,
    type: 'On-site',
    applicants: 67,
    posted: '6 days ago',
    tags: ['Excel', 'Financial Analysis', 'Python'],
    isHot: false,
    isNew: false,
  },
  {
    id: 8,
    title: 'Business Development Intern',
    company: 'Booking.com',
    logo: 'BC',
    logoColor: 'bg-green-500',
    location: 'Hamburg',
    duration: '3 months',
    stipend: 850,
    type: 'Hybrid',
    applicants: 145,
    posted: '2 days ago',
    tags: ['Sales', 'CRM', 'Networking'],
    isHot: false,
    isNew: true,
  },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const [minStipend, setMinStipend] = useState(0);
  const [maxStipend, setMaxStipend] = useState(4000);
  const [showFilters, setShowFilters] = useState(true);

  const jobTitle = searchParams.get('title') || '';
  const city = searchParams.get('city') || '';

  const filteredInternships = searchInternships.filter((internship) => {
    const titleMatch = !jobTitle || internship.title.toLowerCase().includes(jobTitle.toLowerCase()) || 
                       internship.tags.some(tag => tag.toLowerCase().includes(jobTitle.toLowerCase()));
    const cityMatch = !city || internship.location.toLowerCase().includes(city.toLowerCase());
    const stipendMatch = internship.stipend >= minStipend && internship.stipend <= maxStipend;
    return titleMatch && cityMatch && stipendMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Back to Home Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Search Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Results</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {jobTitle && (
              <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Job: {jobTitle}
              </div>
            )}
            {city && (
              <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                Location: {city}
              </div>
            )}
          </div>
          <p className="text-gray-600 text-lg">
            Found <span className="font-bold text-blue-600">{filteredInternships.length}</span> internship opportunities
          </p>
        </div>

        {/* Results Section with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>
                
                {/* Stipend Range Filter */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h4 className="font-semibold text-gray-900">Stipend Range</h4>
                    <ChevronUp className={`w-4 h-4 transition-transform ${!showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  {showFilters && (
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="4000"
                        step="50"
                        value={minStipend}
                        onChange={(e) => setMinStipend(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>€0</span>
                        <span>€4,000/month</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="4000"
                        step="50"
                        value={maxStipend}
                        onChange={(e) => setMaxStipend(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <button
                        onClick={() => {
                          setMinStipend(0);
                          setMaxStipend(4000);
                        }}
                        className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Reset Range
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-gray-600 text-lg">
                  Found <span className="font-bold text-blue-600">{filteredInternships.length}</span> internship opportunities
                </p>
              </div>
              {filteredInternships.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
                >
                  {/* Hot/New Badge */}
                  <div className="flex gap-2 p-4">
                    {internship.isHot && (
                      <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        🔥 Hot
                      </span>
                    )}
                    {internship.isNew && (
                      <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        ✨ New
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-4">
                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${internship.logoColor} flex items-center justify-center text-white font-bold`}>
                          {internship.logo}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{internship.company}</h3>
                          <p className="text-xs text-gray-500">{internship.posted}</p>
                        </div>
                      </div>
                      <button className="text-gray-300 hover:text-blue-500 transition">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 cursor-pointer transition">
                      {internship.title}
                    </h4>

                    {/* Details */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Euro className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-green-600">
                            {formatCurrency(convertCurrency(internship.stipend, 'EUR', currency.code), currency.symbol)}/month
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {internship.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="w-4 h-4" />
                        {internship.applicants} applied
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Apply Button */}
                    <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 font-semibold">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h3>
                  <p className="text-gray-600 mb-8">
                    Try adjusting your search criteria or browse all internships
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
