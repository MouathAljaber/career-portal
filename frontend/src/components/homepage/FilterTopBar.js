import { useState } from 'react';
import { Grid3X3, List, Zap, Home, TrendingUp } from 'lucide-react';

const quickFilters = [
  { id: 'remote', label: 'Remote', icon: Home },
  { id: 'high-stipend', label: 'High Stipend', icon: TrendingUp },
  { id: 'actively-hiring', label: 'Actively Hiring', icon: Zap },
];

const FilterTopBar = ({ filters, setFilters, totalCount, viewMode, setViewMode }) => {
  const [sortBy, setSortBy] = useState('latest');

  const toggleQuickFilter = filterId => {
    if (filterId === 'remote') {
      // Toggle Remote work type
      const currentWorkTypes = filters.workTypes;
      const newWorkTypes = currentWorkTypes.includes('Remote')
        ? currentWorkTypes.filter(t => t !== 'Remote')
        : [...currentWorkTypes, 'Remote'];
      setFilters({ ...filters, workTypes: newWorkTypes });
    } else if (filterId === 'high-stipend') {
      // Set high stipend range (e.g., 1200-4000)
      setFilters({ ...filters, stipendRange: [1200, 4000] });
    } else if (filterId === 'actively-hiring') {
      // Could be used to filter by isHot or isNew - for now toggle isHot
      setFilters({ ...filters, activelyHiring: !filters.activelyHiring });
    }
  };

  const isFilterActive = filterId => {
    if (filterId === 'remote') {
      return filters.workTypes.includes('Remote');
    } else if (filterId === 'high-stipend') {
      return filters.stipendRange[0] >= 1200;
    } else if (filterId === 'actively-hiring') {
      return filters.activelyHiring;
    }
    return false;
  };

  const handleSortChange = e => {
    setSortBy(e.target.value);
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {quickFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleQuickFilter(filter.id)}
              className={`h-8 text-xs px-3 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                isFilterActive(filter.id)
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:border-blue-400'
              }`}
            >
              <filter.icon className="w-3.5 h-3.5" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort & View Controls */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="h-8 px-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="latest">Latest First</option>
            <option value="stipend-high">Stipend: High to Low</option>
            <option value="stipend-low">Stipend: Low to High</option>
            <option value="applicants">Most Applied</option>
          </select>

          <div className="hidden sm:flex items-center border border-gray-300 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`h-7 w-7 p-0 flex items-center justify-center rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`h-7 w-7 p-0 flex items-center justify-center rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-800 font-medium">
          Showing <span className="font-bold text-gray-900">{totalCount}</span> internships
        </p>
      </div>
    </div>
  );
};

export default FilterTopBar;
