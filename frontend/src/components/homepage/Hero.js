import { Search, MapPin, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const germanCities = [
  'Berlin',
  'Munich',
  'Frankfurt',
  'Hamburg',
  'Cologne',
  'Stuttgart',
  'Remote'
];

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

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setShowCitySuggestions(false);
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowCitySuggestions(true);
  };

  const filteredCities = germanCities.filter(c => 
    c.toLowerCase().includes(city.toLowerCase())
  );
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Find Internships and Jobs in Germany
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 mx-auto">
            Discover 1,000+ internship opportunities from top companies. Your dream career starts here.
          </p>

          <p className="text-lg sm:text-xl text-gray-600 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text mb-10 max-w-2xl bg-clip-text text-transparent mx-auto">
            For International and EU Students
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-12 border-0 bg-gray-100 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or remote"
                  value={city}
                  onChange={handleCityChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-12 border-0 bg-gray-100 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showCitySuggestions && city && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    {filteredCities.map((c) => (
                      <button
                        key={c}
                        onClick={() => handleCitySelect(c)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        📍 {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={handleSearch}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>

          {/* Quick info badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['🇩🇪 Germany-Based', '🌍 Open to International Students', '💶 Paid Internships', '📄 Visa-Friendly', '🗣 English-Friendly Roles'].map((tag) => (
              <span
                key={tag}
                className="text-sm text-blue-600 px-3 py-1 bg-blue-50 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
