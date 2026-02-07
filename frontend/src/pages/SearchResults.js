import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Euro, Users, Bookmark, ArrowRight, Home, ChevronUp } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { getAllInternships } from '../services/internshipService';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { saveJob, unsaveJob, isJobSaved, applyToJob, isAuthenticated } = useAuth();
  const [minStipend, setMinStipend] = useState(0);
  const [maxStipend, setMaxStipend] = useState(4000);
  const [showFilters, setShowFilters] = useState(true);
  const [internships, setInternships] = useState([]);

  // Load internships from service
  useEffect(() => {
    setInternships(getAllInternships());
  }, []);

  const handleApply = internship => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for internships');
      return;
    }

    applyToJob(internship.id, {
      title: internship.title,
      company: internship.company,
      logo: internship.logo,
      logoColor: internship.logoColor,
      location: internship.location,
      duration: internship.duration,
      stipend: internship.stipend,
      type: internship.type,
      tags: internship.tags,
    });

    // Refresh internships to show updated applicant count
    setInternships([...getAllInternships()]);
  };

  const toggleBookmark = internship => {
    if (!isAuthenticated) {
      toast.error('Please login to bookmark internships');
      return;
    }

    if (isJobSaved(internship.id)) {
      unsaveJob(internship.id);
    } else {
      saveJob(internship.id, {
        title: internship.title,
        company: internship.company,
        logo: internship.logo,
        logoColor: internship.logoColor,
        location: internship.location,
        duration: internship.duration,
        stipend: internship.stipend,
        type: internship.type,
        applicants: internship.applicants,
        posted: internship.posted,
        tags: internship.tags,
      });
    }
  };

  const jobTitle = searchParams.get('title') || '';
  const city = searchParams.get('city') || '';
  const category = searchParams.get('category') || '';

  const filteredInternships = internships.filter(internship => {
    const titleMatch =
      !jobTitle ||
      internship.title.toLowerCase().includes(jobTitle.toLowerCase()) ||
      internship.tags.some(tag => tag.toLowerCase().includes(jobTitle.toLowerCase()));
    const cityMatch = !city || internship.location.toLowerCase().includes(city.toLowerCase());
    const categoryMatch =
      !category ||
      internship.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase())) ||
      internship.title.toLowerCase().includes(category.toLowerCase());
    const stipendMatch = internship.stipend >= minStipend && internship.stipend <= maxStipend;
    return titleMatch && cityMatch && categoryMatch && stipendMatch;
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
            {category && (
              <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Category: {category}
              </div>
            )}
          </div>
          <p className="text-gray-600 text-lg">
            Found <span className="font-bold text-blue-600">{filteredInternships.length}</span>{' '}
            internship opportunities
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
                    <ChevronUp
                      className={`w-4 h-4 transition-transform ${!showFilters ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {showFilters && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                          <span>Min Stipend</span>
                          <span>€{minStipend.toLocaleString()}/month</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="4000"
                          step="50"
                          value={minStipend}
                          onChange={e => setMinStipend(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                          <span>Max Stipend</span>
                          <span>€{maxStipend.toLocaleString()}/month</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="4000"
                          step="50"
                          value={maxStipend}
                          onChange={e => setMaxStipend(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                      </div>
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
                  Found{' '}
                  <span className="font-bold text-blue-600">{filteredInternships.length}</span>{' '}
                  internship opportunities
                </p>
              </div>
              {filteredInternships.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredInternships.map(internship => (
                    <div
                      key={internship.id}
                      className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
                      onClick={() => navigate(`/internship/${internship.id}`)}
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
                            <div
                              className={`w-12 h-12 rounded-lg ${internship.logoColor} flex items-center justify-center text-white font-bold`}
                            >
                              {internship.logo}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{internship.company}</h3>
                              <p className="text-xs text-gray-500">{internship.posted}</p>
                            </div>
                          </div>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              toggleBookmark(internship);
                            }}
                            className={`transition ${
                              isJobSaved(internship.id)
                                ? 'text-blue-600'
                                : 'text-gray-300 hover:text-blue-500'
                            }`}
                          >
                            <Bookmark
                              className={`w-5 h-5 ${isJobSaved(internship.id) ? 'fill-current' : ''}`}
                            />
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
                                {formatCurrency(
                                  convertCurrency(internship.stipend, 'EUR', currency.code),
                                  currency.symbol
                                )}
                                /month
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
                          {internship.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Apply Button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleApply(internship);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 font-semibold"
                        >
                          Apply Now
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
