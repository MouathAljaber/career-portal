import React, { useState } from 'react';
import { X, Upload, FileText, Briefcase, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ApplicationModal = ({ isOpen, onClose, internship, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: '',
    portfolio: '',
    linkedIn: '',
    github: '',
    expectedStartDate: '',
    availability: 'full-time',
    whyInterested: '',
    relevantExperience: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (formData.coverLetter.trim().length < 100) {
      newErrors.coverLetter = 'Cover letter must be at least 100 characters';
    }

    if (!formData.resume.trim()) {
      newErrors.resume = 'Resume/CV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.whyInterested.trim()) {
      newErrors.whyInterested = 'This field is required';
    } else if (formData.whyInterested.trim().length < 50) {
      newErrors.whyInterested = 'Please provide at least 50 characters';
    }

    if (!formData.expectedStartDate) {
      newErrors.expectedStartDate = 'Expected start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (step !== 3) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        appliedAt: new Date().toISOString(),
      });
      toast.success('Application submitted successfully!');
      onClose();
      // Reset form
      setFormData({
        resume: '',
        coverLetter: '',
        portfolio: '',
        linkedIn: '',
        github: '',
        expectedStartDate: '',
        availability: 'full-time',
        whyInterested: '',
        relevantExperience: '',
        additionalInfo: '',
      });
      setStep(1);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl modal-content">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Apply to {internship?.company}</h2>
              <p className="text-sm text-gray-600 mt-1">{internship?.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map(s => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {s}
                    </div>
                    <span className="text-xs mt-2 text-gray-600">
                      {s === 1 ? 'Documents' : s === 2 ? 'Details' : 'Review'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all ${
                        step > s ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {/* Step 1: Documents */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Resume/CV <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Paste your resume URL or upload file"
                      value={formData.resume}
                      onChange={e => handleChange('resume', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.resume ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <Upload className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Upload to Google Drive/Dropbox and paste the link, or enter your resume URL
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover Letter <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={8}
                    placeholder="Write a compelling cover letter explaining why you're the perfect fit for this role..."
                    value={formData.coverLetter}
                    onChange={e => handleChange('coverLetter', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                      errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.coverLetter && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.coverLetter.length} / 100 minimum characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolio}
                      onChange={e => handleChange('portfolio', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedIn}
                      onChange={e => handleChange('linkedIn', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={e => handleChange('github', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why are you interested in this position? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Explain what excites you about this opportunity and why you'd be a great fit..."
                    value={formData.whyInterested}
                    onChange={e => handleChange('whyInterested', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                      errors.whyInterested ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.whyInterested && (
                    <p className="text-red-500 text-sm mt-1">{errors.whyInterested}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.whyInterested.length} / 50 minimum characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Experience (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe any relevant projects, internships, or experience..."
                    value={formData.relevantExperience}
                    onChange={e => handleChange('relevantExperience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.expectedStartDate}
                      onChange={e => handleChange('expectedStartDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.expectedStartDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.expectedStartDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.expectedStartDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={e => handleChange('availability', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any other information you'd like to share..."
                    value={formData.additionalInfo}
                    onChange={e => handleChange('additionalInfo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Review Your Application</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Please review all details before submitting. You won't be able to edit after
                      submission.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Documents
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Resume: </span>
                        <span className="text-gray-900 font-medium">
                          {formData.resume.length > 50
                            ? formData.resume.substring(0, 50) + '...'
                            : formData.resume}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cover Letter: </span>
                        <span className="text-gray-900 font-medium">
                          {formData.coverLetter.length} characters
                        </span>
                      </div>
                      {formData.portfolio && (
                        <div>
                          <span className="text-gray-600">Portfolio: </span>
                          <span className="text-gray-900 font-medium">{formData.portfolio}</span>
                        </div>
                      )}
                      {formData.linkedIn && (
                        <div>
                          <span className="text-gray-600">LinkedIn: </span>
                          <span className="text-gray-900 font-medium">{formData.linkedIn}</span>
                        </div>
                      )}
                      {formData.github && (
                        <div>
                          <span className="text-gray-600">GitHub: </span>
                          <span className="text-gray-900 font-medium">{formData.github}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Application Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Start Date: </span>
                        <span className="text-gray-900 font-medium">
                          {new Date(formData.expectedStartDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Availability: </span>
                        <span className="text-gray-900 font-medium capitalize">
                          {formData.availability}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Why Interested: </span>
                        <p className="text-gray-900 mt-1">
                          {formData.whyInterested.length > 150
                            ? formData.whyInterested.substring(0, 150) + '...'
                            : formData.whyInterested}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> By submitting this application, you confirm that all
                    information provided is accurate. The employer will review your application and
                    contact you if selected for an interview.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <button
              onClick={step === 1 ? onClose : handleBack}
              className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Step {step} of 3</span>
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
