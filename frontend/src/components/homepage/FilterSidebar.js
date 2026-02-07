import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import toast from 'react-hot-toast';
import {
  getLocationCounts,
  getCategoryCounts,
  getWorkTypeCounts,
  getDurationCounts,
} from '../../services/internshipService';

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

  // Calculate dynamic counts from real data
  const locationCounts = useMemo(() => getLocationCounts(), []);
  const categoryCounts = useMemo(() => getCategoryCounts(), []);
  const workTypeCounts = useMemo(() => getWorkTypeCounts(), []);
  const durationCounts = useMemo(() => getDurationCounts(), []);

  const locations = [
    { id: 'berlin', label: 'Berlin', count: locationCounts['berlin'] || 0 },
    { id: 'munich', label: 'Munich', count: locationCounts['munich'] || 0 },
    { id: 'frankfurt', label: 'Frankfurt', count: locationCounts['frankfurt'] || 0 },
    { id: 'hamburg', label: 'Hamburg', count: locationCounts['hamburg'] || 0 },
    { id: 'cologne', label: 'Cologne', count: locationCounts['cologne'] || 0 },
    { id: 'stuttgart', label: 'Stuttgart', count: locationCounts['stuttgart'] || 0 },
    { id: 'remote', label: 'Work from Home', count: locationCounts['remote'] || 0 },
  ];

  const categories = [
    { id: 'technology', label: 'Technology', count: categoryCounts['Technology'] || 0 },
    { id: 'marketing', label: 'Marketing', count: categoryCounts['Marketing'] || 0 },
    { id: 'design', label: 'Design', count: categoryCounts['Design'] || 0 },
    { id: 'finance', label: 'Finance', count: categoryCounts['Finance'] || 0 },
    { id: 'data-science', label: 'Data Science', count: categoryCounts['Data Science'] || 0 },
    { id: 'business', label: 'Business', count: categoryCounts['Business'] || 0 },
  ];

  const workTypes = [
    { id: 'remote', label: 'Remote', count: workTypeCounts['remote'] || 0 },
    { id: 'hybrid', label: 'Hybrid', count: workTypeCounts['hybrid'] || 0 },
    { id: 'onsite', label: 'On-site', count: workTypeCounts['onsite'] || 0 },
  ];

  const durations = [
    { id: '1-2', label: '1-2 months', count: durationCounts['1-2'] || 0 },
    { id: '3-4', label: '3-4 months', count: durationCounts['3-4'] || 0 },
    { id: '5-6', label: '5-6 months', count: durationCounts['5-6'] || 0 },
    { id: '6+', label: '6+ months', count: durationCounts['6+'] || 0 },
  ];

  const handleLocationChange = locationId => {
    setSelectedLocations(prev =>
      prev.includes(locationId) ? prev.filter(id => id !== locationId) : [...prev, locationId]
    );
  };

  const handleCategoryChange = categoryId => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleWorkTypeChange = typeId => {
    setSelectedWorkTypes(prev =>
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    );
  };

  const handleDurationChange = durationId => {
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

  const handleApplyFilters = e => {
    e?.preventDefault();
    e?.stopPropagation();

    // Store current scroll position
    const currentScrollY = window.scrollY;

    const newFilters = {
      locations: selectedLocations,
      categories: selectedCategories,
      workTypes: selectedWorkTypes,
      durations: selectedDurations,
      stipendRange,
    };
    setFilters(newFilters);

    // Restore scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);

    // Show success toast with custom styling
    toast.success('Filters applied successfully! Results updated.', {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#10b981',
        color: '#fff',
        padding: '16px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '600',
      },
      icon: '✓',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button
          onClick={handleResetAll}
          className="text-xs text-gray-800 font-medium hover:text-primary-600 h-8 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset all
        </button>
      </div>

      <div className="space-y-5">
        {/* Location Filter */}
        <FilterSection title="Location">
          {locations.map(location => (
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
          {categories.map(category => (
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
          {workTypes.map(type => (
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
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <label>
                  Min: {currency.symbol}
                  {stipendRange[0].toLocaleString()}
                </label>
                <label>
                  Max: {currency.symbol}
                  {stipendRange[1].toLocaleString()}
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="4000"
                step="50"
                value={stipendRange[0]}
                onChange={e => setStipendRange([parseInt(e.target.value), stipendRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="4000"
                step="50"
                value={stipendRange[1]}
                onChange={e => setStipendRange([stipendRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>
                {currency.symbol}
                {stipendRange[0].toLocaleString()}
              </span>
              <span>
                {currency.symbol}
                {stipendRange[1].toLocaleString()}/month
              </span>
            </div>
          </div>
        </FilterSection>

        {/* Duration Filter */}
        <FilterSection title="Duration">
          {durations.map(duration => (
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

      <button
        type="button"
        onClick={handleApplyFilters}
        className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition-colors shadow-sm"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
