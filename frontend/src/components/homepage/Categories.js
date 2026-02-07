import { Code, Palette, TrendingUp, Megaphone, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { getCategoryCounts } from '../../services/internshipService';

const Categories = () => {
  const navigate = useNavigate();

  // Calculate dynamic counts from real data
  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const allCategories = [
    {
      icon: Code,
      name: 'Technology',
      count: String(categoryCounts['Technology'] || 0),
      description: 'Software, IT & Development',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Palette,
      name: 'Design',
      count: String(categoryCounts['Design'] || 0),
      description: 'UI/UX, Graphics & Creative',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: TrendingUp,
      name: 'Finance',
      count: String(categoryCounts['Finance'] || 0),
      description: 'Banking, Investment & Accounting',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: Megaphone,
      name: 'Marketing',
      count: String(categoryCounts['Marketing'] || 0),
      description: 'Digital, Content & Branding',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  const categories = allCategories;

  const handleCategoryClick = categoryName => {
    navigate(`/search?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section
      id="categories"
      className="py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2
              id="categories-heading"
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
            >
              Explore by Category
            </h2>
            <p className="text-gray-800 font-medium">Find internships across various industries and domains</p>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
            aria-label="View all categories"
          >
            View all categories
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        <nav
          aria-label="Job categories"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="group text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer active:translate-y-0"
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0 }}
              aria-label={`Browse ${category.count} ${category.name} internships in ${category.description}`}
            >
              <div className="flex flex-col gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/30 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110`}
                  aria-hidden="true"
                >
                  <category.icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-800 mb-3 line-clamp-2 font-medium">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-semibold text-blue-600"
                      aria-label={`${category.count} job openings`}
                    >
                      {category.count} openings
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-gray-700 group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </nav>
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
    </section>
  );
};

export default Categories;
