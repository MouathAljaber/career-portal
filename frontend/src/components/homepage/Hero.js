import { Search, MapPin, Briefcase, Users, Building2, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-800">
              Join 50,000+ students already hired
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">4.9</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Launch Your Career with
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Premium Internships
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover 10,000+ internship opportunities from top companies. Your dream career starts here.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  className="pl-12 h-12 border-0 bg-gray-100 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or remote"
                  className="pl-12 h-12 border-0 bg-gray-100 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-sm">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-sm text-gray-600">Popular:</span>
            {['Software Development', 'Marketing', 'Data Science', 'Design', 'Finance'].map((tag) => (
              <button
                key={tag}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-gray-200 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">10K+</span>
              </div>
              <p className="text-sm text-gray-600">Active Internships</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">500+</span>
              </div>
              <p className="text-sm text-gray-600">Partner Companies</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">50K+</span>
              </div>
              <p className="text-sm text-gray-600">Students Placed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
