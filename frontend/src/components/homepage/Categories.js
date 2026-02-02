import { Code, Palette, TrendingUp, Megaphone, BarChart3, Briefcase, Cpu, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: Code, name: 'Technology', count: '347', description: 'Software, IT & Development', gradient: 'from-blue-500 to-indigo-600' },
  { icon: Palette, name: 'Design', count: '156', description: 'UI/UX, Graphics & Creative', gradient: 'from-purple-500 to-pink-600' },
  { icon: TrendingUp, name: 'Finance', count: '89', description: 'Banking, Investment & Accounting', gradient: 'from-green-500 to-emerald-600' },
  { icon: Megaphone, name: 'Marketing', count: '203', description: 'Digital, Content & Branding', gradient: 'from-orange-500 to-red-600' },
  { icon: BarChart3, name: 'Data Science', count: '124', description: 'Analytics, ML & AI', gradient: 'from-cyan-500 to-blue-600' },
  { icon: Briefcase, name: 'Business', count: '167', description: 'Operations, Strategy & Consulting', gradient: 'from-gray-600 to-gray-800' },
  { icon: Cpu, name: 'Engineering', count: '234', description: 'Mechanical, Electrical & Civil', gradient: 'from-yellow-500 to-orange-600' },
  { icon: GraduationCap, name: 'Research', count: '78', description: 'Academic, R&D & Innovation', gradient: 'from-indigo-500 to-purple-600' },
];

const Categories = () => {
  return (
    <section id="categories" className="py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 id="categories-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Explore by Category
            </h2>
            <p className="text-gray-600">
              Find internships across various industries and domains
            </p>
          </div>
          <Link to="/categories" className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group" aria-label="View all categories">
            View all categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label="Job categories" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {categories.map((category, index) => (
            <button
              key={category.name}
              className="group text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0 }}
              aria-label={`Browse ${category.count} ${category.name} internships in ${category.description}`}
            >
              <div className="flex flex-col gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/30 group-hover:shadow-lg transition-shadow`} aria-hidden="true">
                  <category.icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600" aria-label={`${category.count} job openings`}>
                      {category.count} openings
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" aria-hidden="true" />
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
