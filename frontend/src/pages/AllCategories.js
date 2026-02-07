import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Palette,
  TrendingUp,
  Megaphone,
  BarChart3,
  Briefcase,
  Cpu,
  GraduationCap,
  ArrowRight,
  Search,
  Briefcase as BriefcaseIcon,
} from 'lucide-react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';

const allCategories = [
  {
    icon: Code,
    name: 'Technology',
    count: 347,
    description: 'Software, IT & Development',
    gradient: 'from-blue-500 to-indigo-600',
    subcategories: [
      'Software Development',
      'Web Development',
      'Mobile Development',
      'DevOps',
      'Cloud Computing',
      'Cybersecurity',
      'QA Testing',
      'Technical Support',
    ],
  },
  {
    icon: Palette,
    name: 'Design',
    count: 156,
    description: 'UI/UX, Graphics & Creative',
    gradient: 'from-purple-500 to-pink-600',
    subcategories: [
      'UI/UX Design',
      'Graphic Design',
      'Product Design',
      'Motion Graphics',
      'Illustration',
      'Brand Design',
      'Web Design',
      'Game Design',
    ],
  },
  {
    icon: TrendingUp,
    name: 'Finance',
    count: 89,
    description: 'Banking, Investment & Accounting',
    gradient: 'from-green-500 to-emerald-600',
    subcategories: [
      'Investment Banking',
      'Financial Analysis',
      'Accounting',
      'Risk Management',
      'Corporate Finance',
      'Wealth Management',
      'Fintech',
      'Auditing',
    ],
  },
  {
    icon: Megaphone,
    name: 'Marketing',
    count: 203,
    description: 'Digital, Content & Branding',
    gradient: 'from-orange-500 to-red-600',
    subcategories: [
      'Digital Marketing',
      'Content Marketing',
      'Social Media',
      'SEO/SEM',
      'Brand Management',
      'Market Research',
      'Email Marketing',
      'Growth Marketing',
    ],
  },
  {
    icon: BarChart3,
    name: 'Data Science',
    count: 124,
    description: 'Analytics, ML & AI',
    gradient: 'from-cyan-500 to-blue-600',
    subcategories: [
      'Data Analysis',
      'Machine Learning',
      'AI Research',
      'Business Intelligence',
      'Data Engineering',
      'Big Data',
      'Statistics',
      'Data Visualization',
    ],
  },
  {
    icon: Briefcase,
    name: 'Business',
    count: 167,
    description: 'Operations, Strategy & Consulting',
    gradient: 'from-gray-600 to-gray-800',
    subcategories: [
      'Management Consulting',
      'Business Development',
      'Operations',
      'Strategy',
      'Product Management',
      'Project Management',
      'Supply Chain',
      'Business Analysis',
    ],
  },
  {
    icon: Cpu,
    name: 'Engineering',
    count: 234,
    description: 'Mechanical, Electrical & Civil',
    gradient: 'from-yellow-500 to-orange-600',
    subcategories: [
      'Mechanical Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace',
      'Automotive',
      'Manufacturing',
      'Industrial Engineering',
    ],
  },
  {
    icon: GraduationCap,
    name: 'Research',
    count: 78,
    description: 'Academic, R&D & Innovation',
    gradient: 'from-indigo-500 to-purple-600',
    subcategories: [
      'Academic Research',
      'R&D',
      'Scientific Research',
      'Innovation',
      'Lab Research',
      'Clinical Research',
      'Market Research',
      'User Research',
    ],
  },
  {
    icon: BriefcaseIcon,
    name: 'Sales',
    count: 145,
    description: 'B2B, B2C & Business Development',
    gradient: 'from-teal-500 to-cyan-600',
    subcategories: [
      'B2B Sales',
      'B2C Sales',
      'Inside Sales',
      'Field Sales',
      'Account Management',
      'Sales Operations',
      'Sales Strategy',
      'Customer Success',
    ],
  },
  {
    icon: Code,
    name: 'Product',
    count: 98,
    description: 'Product Management & Strategy',
    gradient: 'from-rose-500 to-pink-600',
    subcategories: [
      'Product Management',
      'Product Strategy',
      'Product Design',
      'Product Analytics',
      'Product Marketing',
      'Product Operations',
      'Roadmap Planning',
      'User Research',
    ],
  },
  {
    icon: Megaphone,
    name: 'Communications',
    count: 67,
    description: 'PR, Media & Content',
    gradient: 'from-violet-500 to-purple-600',
    subcategories: [
      'Public Relations',
      'Corporate Communications',
      'Media Relations',
      'Content Creation',
      'Internal Communications',
      'Crisis Management',
      'Journalism',
      'Copywriting',
    ],
  },
  {
    icon: TrendingUp,
    name: 'Human Resources',
    count: 54,
    description: 'Talent, Recruiting & People Ops',
    gradient: 'from-emerald-500 to-green-600',
    subcategories: [
      'Recruiting',
      'Talent Acquisition',
      'People Operations',
      'HR Business Partner',
      'Compensation & Benefits',
      'Learning & Development',
      'Employee Relations',
      'HR Analytics',
    ],
  },
];

const AllCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = allCategories.filter(
    category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalInternships = allCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-blue-700 text-white pt-28 pb-16 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Explore All Categories</h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8">
              Discover {totalInternships.toLocaleString()}+ internship opportunities across{' '}
              {allCategories.length} categories in Germany
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories or subcategories..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                aria-label="Search categories"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <article
                  key={category.name}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    animation: `fadeIn 0.4s ease-out ${index * 0.05}s forwards`,
                    opacity: 0,
                  }}
                >
                  {/* Category Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/30 group-hover:shadow-lg transition-shadow`}
                      aria-hidden="true"
                    >
                      <category.icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 6).map(sub => (
                        <span
                          key={sub}
                          className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 6 && (
                        <span className="text-xs px-2.5 py-1 text-gray-500">
                          +{category.subcategories.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <BriefcaseIcon className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm font-semibold">{category.count} openings</span>
                    </div>
                    <Link
                      to={`/search?category=${encodeURIComponent(category.name)}`}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      aria-label={`Browse ${category.name} internships`}
                    >
                      Browse
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{allCategories.length}</div>
              <div className="text-sm text-gray-600">Industry Categories</div>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {totalInternships.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Total Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {allCategories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Specializations</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 sm:p-10 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              We add new internship opportunities daily. Set up alerts to be notified when positions
              matching your interests become available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 hover:shadow-md inline-flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search All Internships
              </Link>
              <button className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2 shadow-md">
                Create Job Alert
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

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

export default AllCategories;
