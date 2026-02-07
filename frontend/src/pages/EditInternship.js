import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { ArrowLeft, Plus, X, ChevronDown } from 'lucide-react';
import { internshipAPI } from '../services/api';
import toast from 'react-hot-toast';
import { skillsDatabase, getAllCategories, getCategoryLabel } from '../services/skillsDatabase';

const EditInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    duration: '3 months',
    stipend: '',
    type: 'On-site',
    category: 'Technology',
    tags: [],
    requirements: [''],
    responsibilities: [''],
    deadline: '',
    startDate: '',
    companyEmail: '',
  });
  const [currentTag, setCurrentTag] = useState('');
  const [showSkillsSuggestions, setShowSkillsSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('technology');

  const categories = getAllCategories();

  // Get skills for selected category that aren't already added
  const suggestedSkills = useMemo(() => {
    const categorySkills = skillsDatabase[selectedCategory]?.skills || [];
    return categorySkills.filter(skill => !formData.tags.includes(skill));
  }, [selectedCategory, formData.tags]);

  useEffect(() => {
    const loadInternship = async () => {
      try {
        setLoadingData(true);
        const response = await internshipAPI.getById(id);
        const internship = response.data;

        setFormData({
          title: internship.title || '',
          description: internship.description || '',
          company: internship.company || '',
          location: internship.location || '',
          duration: internship.duration || '3 months',
          stipend: internship.stipend?.toString() || '',
          type: internship.type || 'On-site',
          category: internship.category || 'Technology',
          tags: internship.tags || [],
          requirements: internship.requirements?.length > 0 ? internship.requirements : [''],
          responsibilities:
            internship.responsibilities?.length > 0 ? internship.responsibilities : [''],
          deadline: internship.deadline
            ? new Date(internship.deadline).toISOString().split('T')[0]
            : '',
          startDate: internship.startDate
            ? new Date(internship.startDate).toISOString().split('T')[0]
            : '',
          companyEmail: internship.companyEmail || '',
        });
      } catch (error) {
        console.error('Error loading internship:', error);
        toast.error('Failed to load internship');
        navigate('/company-portal');
      } finally {
        setLoadingData(false);
      }
    };

    loadInternship();
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = tag => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const handleAddSuggestedSkill = skill => {
    if (!formData.tags.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, skill],
      }));
    }
  };

  const handleAddAllCategorySkills = () => {
    const categorySkills = skillsDatabase[selectedCategory]?.skills || [];
    const newSkills = categorySkills.filter(skill => !formData.tags.includes(skill));

    if (newSkills.length > 0) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, ...newSkills],
      }));
      toast.success(`Added ${newSkills.length} skills!`);
    } else {
      toast.info('All skills from this category are already added');
    }
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
  };

  const handleAddRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const handleRemoveRequirement = index => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData(prev => ({ ...prev, responsibilities: newResponsibilities }));
  };

  const handleAddResponsibility = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ''],
    }));
  };

  const handleRemoveResponsibility = index => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.stipend) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.tags.length === 0) {
      toast.error('Please add at least one skill tag');
      return;
    }

    if (formData.description.length < 50) {
      toast.error('Description must be at least 50 characters');
      return;
    }

    const filteredRequirements = formData.requirements.filter(r => r.trim());
    const filteredResponsibilities = formData.responsibilities.filter(r => r.trim());

    if (filteredRequirements.length === 0) {
      toast.error('Please add at least one requirement');
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        ...formData,
        stipend: parseFloat(formData.stipend),
        requirements: filteredRequirements,
        responsibilities: filteredResponsibilities,
      };

      await internshipAPI.update(id, updateData);
      toast.success('Internship updated successfully!');
      navigate('/company-portal');
    } catch (error) {
      console.error('Error updating internship:', error);
      toast.error(error.response?.data?.message || 'Failed to update internship');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div
          className="flex items-center justify-center"
          style={{ minHeight: 'calc(100vh - 64px)' }}
        >
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading internship...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/company-portal')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portal
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Internship</h1>
            <p className="text-gray-600">Update internship details</p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Software Development Intern"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Tech Innovation GmbH"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Berlin, Germany"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Stipend (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    placeholder="e.g. 1200"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Email
                  </label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    placeholder="hr@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the internship opportunity..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.description.length} characters (min 50)
                </p>
              </div>
            </div>

            {/* Skills/Tags */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Required Skills</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Add Skills/Tags <span className="text-red-500">*</span>
                </label>

                {/* Manual Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={e => setCurrentTag(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="e.g. React, Python, SQL"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSkillsSuggestions(!showSkillsSuggestions)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center gap-2"
                  >
                    <ChevronDown className="w-5 h-5" />
                    Suggest
                  </button>
                </div>

                {/* Skills Suggestions Panel */}
                {showSkillsSuggestions && (
                  <div className="mb-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-emerald-900">
                          Select Skills by Category
                        </h3>
                        <button
                          type="button"
                          onClick={handleAddAllCategorySkills}
                          className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                        >
                          Add All ({suggestedSkills.length})
                        </button>
                      </div>

                      {/* Category Tabs */}
                      <div className="flex flex-wrap gap-2 pb-3 border-b border-emerald-200">
                        {categories.map(category => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              selectedCategory === category
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
                            }`}
                          >
                            {getCategoryLabel(category)}
                          </button>
                        ))}
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {suggestedSkills.slice(0, 12).map(skill => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleAddSuggestedSkill(skill)}
                            className="px-3 py-2 bg-white text-emerald-700 border border-emerald-300 rounded hover:bg-emerald-50 transition-colors text-sm font-medium hover:border-emerald-500"
                          >
                            {skill}
                          </button>
                        ))}
                      </div>

                      {suggestedSkills.length > 12 && (
                        <p className="text-xs text-emerald-700 pt-2">
                          Showing 12 of {suggestedSkills.length} skills. Click to add more!
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Added Skills Display */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={e => handleRequirementChange(index, e.target.value)}
                    placeholder="e.g. Currently enrolled in Computer Science program"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddRequirement}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>

            {/* Responsibilities */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Responsibilities</h2>
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={e => handleResponsibilityChange(index, e.target.value)}
                    placeholder="e.g. Assist in developing new features"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveResponsibility(index)}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Responsibility
              </button>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Important Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/company-portal')}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Internship'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditInternship;
