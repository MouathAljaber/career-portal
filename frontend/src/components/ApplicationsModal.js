import React, { useState, useEffect, useCallback } from 'react';
import { X, Mail, Calendar, FileText, ExternalLink, User, Phone } from 'lucide-react';
import { internshipAPI } from '../services/api';
import toast from 'react-hot-toast';

const ApplicationsModal = ({ isOpen, onClose, internshipId, internshipTitle, onViewDetails }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await internshipAPI.getApplications(internshipId);
      setApplications(response.data || []);
      if (response.data?.length) {
        setSelectedApplication(prev => prev || response.data[0]);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [internshipId]);

  useEffect(() => {
    if (isOpen && internshipId) {
      loadApplications();
    }
  }, [isOpen, internshipId, loadApplications]);

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = status => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      interview: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const updateStatus = async (applicationId, nextStatus) => {
    try {
      await internshipAPI.updateApplicationStatus(internshipId, applicationId, nextStatus);
      setApplications(prev =>
        prev.map(app => (app.id === applicationId ? { ...app, status: nextStatus } : app))
      );
      setSelectedApplication(prev =>
        prev && prev.id === applicationId ? { ...prev, status: nextStatus } : prev
      );
      toast.success('Status updated');
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update status');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 modal-backdrop">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col modal-content">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
            <p className="text-gray-600">{internshipTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">No applications yet</p>
              <p className="text-gray-500 text-sm mt-2">
                Applications will appear here once students apply
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applications List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  All Applications ({applications.length})
                </h3>
                {applications.map(app => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApplication(app)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedApplication === app ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {app.student?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {app.student?.email || 'Applicant'}
                          </h4>
                          <p className="text-sm text-gray-600">{app.student?.email}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(app.appliedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Application Details */}
              <div className="lg:sticky lg:top-0">
                {selectedApplication ? (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Application Details</h3>

                    {/* Student Info */}
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                          {selectedApplication.student?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {selectedApplication.student?.email || 'Applicant'}
                          </h4>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Mail className="w-4 h-4" />
                            {selectedApplication.student?.email}
                          </div>
                        </div>
                      </div>

                      {selectedApplication.student?.phone && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                          <Phone className="w-4 h-4" />
                          {selectedApplication.student?.phone}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4" />
                        Applied: {formatDate(selectedApplication.appliedAt)}
                      </div>
                    </div>

                    {/* Resume */}
                    {selectedApplication.resume && (
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Resume
                        </h5>
                        <a
                          href={selectedApplication.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Resume
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}

                    {/* Cover Letter */}
                    {selectedApplication.coverLetter && (
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Cover Letter</h5>
                        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                          {selectedApplication.coverLetter}
                        </p>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Application Status</h5>
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(selectedApplication.status)}`}
                        >
                          {selectedApplication.status.charAt(0).toUpperCase() +
                            selectedApplication.status.slice(1)}
                        </span>
                        <select
                          value={selectedApplication.status}
                          onChange={e => updateStatus(selectedApplication.id, e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="interview">Interview</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-2">
                      <button
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all flex items-center justify-center gap-2"
                        onClick={() =>
                          onViewDetails &&
                          onViewDetails({
                            ...selectedApplication,
                            internshipId,
                            studentName: selectedApplication.student?.email,
                          })
                        }
                      >
                        <FileText className="w-5 h-5" />
                        View Full Details
                      </button>
                      <button
                        className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-all"
                        onClick={() =>
                          window.open(`mailto:${selectedApplication.student?.email}`, '_blank')
                        }
                      >
                        Contact Applicant
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Select an application to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;
