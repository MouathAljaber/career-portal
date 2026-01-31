import { Code, Palette, TrendingUp, Megaphone, BarChart3, Briefcase, Cpu, GraduationCap, ArrowRight } from 'lucide-react';

const categories = [
  { icon: Code, name: 'Technology', count: '2,500+', description: 'Software, IT & Development' },
  { icon: Palette, name: 'Design', count: '1,200+', description: 'UI/UX, Graphics & Creative' },
  { icon: TrendingUp, name: 'Finance', count: '800+', description: 'Banking, Investment & Accounting' },
  { icon: Megaphone, name: 'Marketing', count: '1,500+', description: 'Digital, Content & Branding' },
  { icon: BarChart3, name: 'Data Science', count: '900+', description: 'Analytics, ML & AI' },
  { icon: Briefcase, name: 'Business', count: '1,100+', description: 'Operations, Strategy & Consulting' },
  { icon: Cpu, name: 'Engineering', count: '1,800+', description: 'Mechanical, Electrical & Civil' },
  { icon: GraduationCap, name: 'Research', count: '600+', description: 'Academic, R&D & Innovation' },
];

const Categories = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Explore by Category
            </h2>
            <p className="text-gray-600">
              Find internships across various industries and domains
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group">
            View all categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((category, index) => (
            <button
              key={category.name}
              className="group text-left bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.03}s forwards`, opacity: 0 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                  <category.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5 truncate">
                    {category.description}
                  </p>
                  <span className="text-xs font-medium text-blue-600 mt-2 block">
                    {category.count} openings
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
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
