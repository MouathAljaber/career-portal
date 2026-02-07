import { Search, MapPin, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const germanCities = ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart', 'Remote'];

const Hero = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [city, setCity] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const handleSearch = () => {
    if (!jobTitle.trim() && !city.trim()) {
      toast.error('Please enter a job title or city');
      return;
    }

    const searchParams = new URLSearchParams();
    if (jobTitle) searchParams.append('title', jobTitle);
    if (city) searchParams.append('city', city);

    toast.success(`Searching for "${jobTitle}" in ${city || 'all cities'}...`);
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleCitySelect = selectedCity => {
    setCity(selectedCity);
    setShowCitySuggestions(false);
  };

  const handleCityChange = e => {
    const value = e.target.value;
    setCity(value);
    setShowCitySuggestions(true);
  };

  const filteredCities = germanCities.filter(c => c.toLowerCase().includes(city.toLowerCase()));
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-primary-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp">
            <span className="block mt-2 text-primary-600">Find Internships and Jobs in Germany</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-900 mb-10 mx-auto leading-relaxed animate-fadeInUp animate-delay-100">
            Discover 1,000+ internship opportunities from top companies. Your dream career starts
            here.
          </p>

          <p className="text-lg sm:text-xl text-gray-900 font-semibold mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeInUp animate-delay-200">
            For International and EU Students
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 max-w-3xl mx-auto animate-scaleIn animate-delay-300">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-12 border-0 bg-gray-50 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder-gray-600"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or remote"
                  value={city}
                  onChange={handleCityChange}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-12 border-0 bg-gray-50 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder-gray-600"
                />
                {showCitySuggestions && city && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    {filteredCities.map(c => (
                      <button
                        key={c}
                        onClick={() => handleCitySelect(c)}
                        className="w-full text-left px-4 py-2 hover:bg-primary-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        📍 {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="h-12 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
