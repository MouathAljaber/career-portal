import React, { useState, useEffect } from 'react';
import { Filter, Star, Mail, MapPin, GraduationCap, ChevronDown, X } from 'lucide-react';
import { talentPoolAPI } from '../services/api';
import toast from 'react-hot-toast';

const TalentPool = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    majors: [],
    universities: [],
    years: [],
    skills: [],
  });

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    major: '',
    university: '',
    skills: '',
    year: '',
    minGPA: '',
    location: '',
    sortBy: 'recent',
    page: 1,
    limit: 12,
  });

  // Load initial data
  useEffect(() => {
    loadStudents();
    loadFilterOptions();
  }, []);

  // Load students when filters change
  useEffect(() => {
    loadStudents();
  }, [filters.sortBy, filters.page]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await talentPoolAPI.getAll(filters);
      setStudents(response.data || []);
    } catch (error) {
      console.error('Error loading talent pool:', error);
      toast.error('Failed to load talent pool');
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const response = await talentPoolAPI.getFilterOptions();
      setFilterOptions(response.data || {});
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page
    }));
  };

  const handleSearch = e => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      page: 1,
    }));
    loadStudents();
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      major: '',
      university: '',
      skills: '',
      year: '',
      minGPA: '',
      location: '',
      sortBy: 'recent',
      page: 1,
      limit: 12,
    });
    setShowFilters(false);
  };

  const viewStudentProfile = async studentId => {
    try {
      const response = await talentPoolAPI.getStudent(studentId);
      setSelectedStudent(response.data);
    } catch (error) {
      console.error('Error loading student profile:', error);
      toast.error('Failed to load student profile');
    }
  };

  const getSkillBadges = skills => {
    return skills
      ? skills.slice(0, 3).map((skill, idx) => (
          <span
            key={idx}
            className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mr-1 mb-1"
          >
            {skill}
          </span>
        ))
      : null;
  };

  const activeFilterCount = [
    filters.search,
    filters.major,
    filters.university,
    filters.skills,
    filters.year,
    filters.minGPA,
    filters.location,
  ].filter(value => value && String(value).trim() !== '').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Pool</h1>
          <p className="text-gray-600">Browse and discover top candidates for your internships</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search by Name/Skills
                  </label>
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Major */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Major</label>
                  <select
                    name="major"
                    value={filters.major}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Majors</option>
                    {filterOptions.majors?.map(major => (
                      <option key={major} value={major}>
                        {major}
                      </option>
                    ))}
                  </select>
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    University
                  </label>
                  <select
                    name="university"
                    value={filters.university}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Universities</option>
                    {filterOptions.universities?.map(uni => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={filters.skills}
                    onChange={handleFilterChange}
                    placeholder="e.g., React, Python"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="e.g., Berlin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year of Study
                  </label>
                  <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Years</option>
                    {filterOptions.years?.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min GPA */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Min GPA</label>
                  <input
                    type="number"
                    name="minGPA"
                    value={filters.minGPA}
                    onChange={handleFilterChange}
                    placeholder="e.g., 3.5"
                    min="0"
                    max="4"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                  <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="gpa-high">Highest GPA</option>
                    <option value="gpa-low">Lowest GPA</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={loadStudents}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Students Grid */}
          <div className="lg:col-span-3">
            {/* Toggle Filters Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found <strong>{students.length}</strong> student{students.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Loading talent pool...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">No students found matching your criteria</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map(student => (
                  <div
                    key={student._id}
                    onClick={() => viewStudentProfile(student._id)}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {student.major} {student.year && `• ${student.year}`}
                        </p>
                      </div>
                      {student.gpa && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-yellow-700">
                            {student.gpa.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* University & Location */}
                    <div className="space-y-2 mb-4 text-sm">
                      {student.university && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <GraduationCap className="w-4 h-4" />
                          {student.university}
                        </div>
                      )}
                      {student.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {student.location}
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    {student.bio && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{student.bio}</p>
                    )}

                    {/* Skills */}
                    {student.skills && student.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Top Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {getSkillBadges(student.skills)}
                          {student.skills.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{student.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          window.location.href = `mailto:${student.user?.email}`;
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          viewStudentProfile(student._id);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-sm"
                      >
                        <ChevronDown className="w-4 h-4" />
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {students.length > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() =>
                    setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))
                  }
                  disabled={filters.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">Page {filters.page}</span>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={students.length < filters.limit}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedStudent.firstName} {selectedStudent.lastName}
              </h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedStudent.user?.email && (
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900 font-medium">{selectedStudent.user?.email}</p>
                    </div>
                  )}
                  {selectedStudent.phone && (
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-900 font-medium">{selectedStudent.phone}</p>
                    </div>
                  )}
                  {selectedStudent.dateOfBirth && (
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {selectedStudent.nationality && (
                    <div>
                      <p className="text-sm text-gray-600">Nationality</p>
                      <p className="text-gray-900 font-medium">{selectedStudent.nationality}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">University</p>
                    <p className="text-gray-900 font-medium">{selectedStudent.university}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Major</p>
                    <p className="text-gray-900 font-medium">{selectedStudent.major}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="text-gray-900 font-medium">{selectedStudent.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">GPA</p>
                    <p className="text-gray-900 font-medium">
                      {selectedStudent.gpa?.toFixed(2) || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedStudent.bio && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700">{selectedStudent.bio}</p>
                </div>
              )}

              {/* Skills */}
              {selectedStudent.skills && selectedStudent.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {selectedStudent.languages && selectedStudent.languages.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Languages</h3>
                  <div className="space-y-2">
                    {selectedStudent.languages.map((lang, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">{lang.language}</span>
                        <span className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => (window.location.href = `mailto:${selectedStudent.user?.email}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPool;
