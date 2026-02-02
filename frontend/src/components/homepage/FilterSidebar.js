import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import toast from 'react-hot-toast';

const locations = [
  { id: 'berlin', label: 'Berlin', count: 350 },
  { id: 'munich', label: 'Munich', count: 280 },
  { id: 'frankfurt', label: 'Frankfurt', count: 220 },
  { id: 'hamburg', label: 'Hamburg', count: 180 },
  { id: 'cologne', label: 'Cologne', count: 150 },
  { id: 'stuttgart', label: 'Stuttgart', count: 120 },
  { id: 'remote', label: 'Work from Home', count: 400 },
];

const categories = [
  { id: 'technology', label: 'Technology', count: 450 },
  { id: 'marketing', label: 'Marketing', count: 280 },
  { id: 'design', label: 'Design', count: 220 },
  { id: 'finance', label: 'Finance', count: 180 },
  { id: 'data-science', label: 'Data Science', count: 160 },
  { id: 'business', label: 'Business', count: 210 },
];

const workTypes = [
  { id: 'remote', label: 'Remote', count: 400 },
  { id: 'hybrid', label: 'Hybrid', count: 350 },
  { id: 'onsite', label: 'On-site', count: 550 },
];

const durations = [
  { id: '1-2', label: '1-2 months', count: 80 },
  { id: '3-4', label: '3-4 months', count: 500 },
  { id: '5-6', label: '5-6 months', count: 350 },
  { id: '6+', label: '6+ months', count: 220 },
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

const FilterSidebar = ({ filters, setFilters }) => {
  const { currency } = useCurrency();
  const [stipendRange, setStipendRange] = useState(filters?.stipendRange || [0, 4000]);
  const [selectedLocations, setSelectedLocations] = useState(filters?.locations || []);
  const [selectedCategories, setSelectedCategories] = useState(filters?.categories || []);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState(filters?.workTypes || []);
  const [selectedDurations, setSelectedDurations] = useState(filters?.durations || []);

  const handleLocationChange = (locationId) => {
    setSelectedLocations(prev =>
      prev.includes(locationId) ? prev.filter(id => id !== locationId) : [...prev, locationId]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleWorkTypeChange = (typeId) => {
    setSelectedWorkTypes(prev =>
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    );
  };

  const handleDurationChange = (durationId) => {
    setSelectedDurations(prev =>
      prev.includes(durationId) ? prev.filter(id => id !== durationId) : [...prev, durationId]
    );
  };

  const handleResetAll = () => {
    setSelectedLocations([]);
    setSelectedCategories([]);
    setSelectedWorkTypes([]);
    setSelectedDurations([]);
    setStipendRange([0, 4000]);
  };

  const handleApplyFilters = () => {
    const newFilters = {
      locations: selectedLocations,
      categories: selectedCategories,
      workTypes: selectedWorkTypes,
      durations: selectedDurations,
      stipendRange
    };
    setFilters(newFilters);
    console.log('Applying filters:', newFilters);
    toast.success('Filters applied! Showing results...');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button onClick={handleResetAll} className="text-xs text-gray-600 hover:text-blue-600 h-8 flex items-center gap-1 transition-colors">
          <RotateCcw className="w-3 h-3" />
          Reset all
        </button>
      </div>

      <div className="space-y-5">
        {/* Location Filter */}
        <FilterSection title="Location">
          {locations.map((location) => (
            <label key={location.id} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded" 
                checked={selectedLocations.includes(location.id)}
                onChange={() => handleLocationChange(location.id)}
              />
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
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded" 
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
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
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded" 
                checked={selectedWorkTypes.includes(type.id)}
                onChange={() => handleWorkTypeChange(type.id)}
              />
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
              max="4000"
              step="50"
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
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded" 
                checked={selectedDurations.includes(duration.id)}
                onChange={() => handleDurationChange(duration.id)}
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">
                {duration.label}
              </span>
              <span className="text-xs text-gray-500">{duration.count}</span>
            </label>
          ))}
        </FilterSection>
      </div>

      <button onClick={handleApplyFilters} className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition-colors shadow-sm">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
