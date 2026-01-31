import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const locations = [
  { id: 'bangalore', label: 'Bangalore', count: 1250 },
  { id: 'mumbai', label: 'Mumbai', count: 980 },
  { id: 'delhi', label: 'Delhi NCR', count: 850 },
  { id: 'hyderabad', label: 'Hyderabad', count: 620 },
  { id: 'pune', label: 'Pune', count: 540 },
  { id: 'chennai', label: 'Chennai', count: 380 },
  { id: 'remote', label: 'Work from Home', count: 2100 },
];

const categories = [
  { id: 'technology', label: 'Technology', count: 2500 },
  { id: 'marketing', label: 'Marketing', count: 1500 },
  { id: 'design', label: 'Design', count: 1200 },
  { id: 'finance', label: 'Finance', count: 800 },
  { id: 'data-science', label: 'Data Science', count: 900 },
  { id: 'business', label: 'Business', count: 1100 },
];

const workTypes = [
  { id: 'remote', label: 'Remote', count: 2100 },
  { id: 'hybrid', label: 'Hybrid', count: 1800 },
  { id: 'onsite', label: 'On-site', count: 3500 },
];

const durations = [
  { id: '1-2', label: '1-2 months', count: 450 },
  { id: '3-4', label: '3-4 months', count: 2800 },
  { id: '5-6', label: '5-6 months', count: 1900 },
  { id: '6+', label: '6+ months', count: 1200 },
];

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 pb-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
};

const FilterSidebar = () => {
  const { currency } = useCurrency();
  const [stipendRange, setStipendRange] = useState([0, 50000]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button className="text-xs text-gray-600 hover:text-blue-600 h-8 flex items-center gap-1 transition-colors">
          <RotateCcw className="w-3 h-3" />
          Reset all
        </button>
      </div>

      <div className="space-y-5">
        {/* Location Filter */}
        <FilterSection title="Location">
          {locations.map((location) => (
            <label key={location.id} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">
                {location.label}
              </span>
              <span className="text-xs text-gray-500">{location.count}</span>
            </label>
          ))}
        </FilterSection>

        {/* Category Filter */}
        <FilterSection title="Category">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">
                {category.label}
              </span>
              <span className="text-xs text-gray-500">{category.count}</span>
            </label>
          ))}
        </FilterSection>

        {/* Work Type Filter */}
        <FilterSection title="Work Type">
          {workTypes.map((type) => (
            <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">
                {type.label}
              </span>
              <span className="text-xs text-gray-500">{type.count}</span>
            </label>
          ))}
        </FilterSection>

        {/* Stipend Range Filter */}
        <FilterSection title="Stipend Range">
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={stipendRange[1]}
              onChange={(e) => setStipendRange([stipendRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-gray-600 mt-4">
              <span>{currency.symbol}{stipendRange[0].toLocaleString()}</span>
              <span>{currency.symbol}{stipendRange[1].toLocaleString()}/month</span>
            </div>
          </div>
        </FilterSection>

        {/* Duration Filter */}
        <FilterSection title="Duration">
          {durations.map((duration) => (
            <label key={duration.id} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">
                {duration.label}
              </span>
              <span className="text-xs text-gray-500">{duration.count}</span>
            </label>
          ))}
        </FilterSection>
      </div>

      <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition-colors shadow-sm">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
