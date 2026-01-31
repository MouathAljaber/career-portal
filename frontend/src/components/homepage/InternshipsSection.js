import { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import FilterTopBar from './FilterTopBar';
import FeaturedInternships from './FeaturedInternships';
import { SlidersHorizontal } from 'lucide-react';

const InternshipsSection = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <section className="py-16 lg:py-20" id="internships">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Discover Internships
            </h2>
            <p className="text-gray-600">
              Browse through thousands of opportunities tailored for you
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {isMobileFilterOpen && (
              <div className="mb-6 lg:hidden">
                <FilterSidebar />
              </div>
            )}
            <FilterTopBar />
            <FeaturedInternships />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipsSection;
