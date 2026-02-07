import React, { useState } from 'react';
import {
  X,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
  Link as LinkIcon,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ApplicationDetailsModal = ({ isOpen, onClose, application, onStatusUpdate }) => {
  const [status, setStatus] = useState(application?.status || 'pending');
  const [notes, setNotes] = useState(application?.notes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !application) return null;

  const handleStatusUpdate = async newStatus => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(application._id || application.id, newStatus, notes);
      setStatus(newStatus);
      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusConfig = currentStatus => {
    const configs = {
      pending: {
        label: 'Pending Review',
        color: 'bg-gray-100 text-gray-700 border-gray-300',
        icon: Clock,
        description: 'Application received and awaiting review',
      },
      reviewing: {
        label: 'Under Review',
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: FileText,
        description: 'Application is being reviewed by the team',
      },
      interview: {
        label: 'Interview Scheduled',
        color: 'bg-purple-100 text-purple-700 border-purple-300',
        icon: Calendar,
        description: 'Candidate invited for interview',
      },
      accepted: {
        label: 'Accepted',
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
        description: 'Application accepted - offer extended',
      },
      rejected: {
        label: 'Rejected',
        color: 'bg-red-100 text-red-700 border-red-300',
        icon: XCircle,
        description: 'Application declined',
      },
    };
    return configs[currentStatus] || configs.pending;
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden modal-content">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Application Details</h2>
              <p className="text-blue-100 text-sm mt-1">
                Applied {formatDate(application.appliedAt || application.createdAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 transition-colors p-2 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row max-h-[calc(90vh-140px)]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Candidate Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {application.studentName?.[0]?.toUpperCase() ||
                      application.name?.[0]?.toUpperCase() ||
                      'S'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {application.studentName || application.name || 'Candidate'}
                    </h3>
                    <div className="space-y-2 text-sm">
                      {application.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${application.email}`} className="hover:text-blue-600">
                            {application.email}
                          </a>
                        </div>
                      )}
                      {application.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${application.phone}`} className="hover:text-blue-600">
                            {application.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-6">
                {/* Resume/CV */}
                {application.resume && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Resume/CV</h4>
                    </div>
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Download className="w-4 h-4" />
                      View Resume
                    </a>
                  </div>
                )}

                {/* Cover Letter */}
                {application.coverLetter && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-gray-900">Cover Letter</h4>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                      {application.coverLetter}
                    </div>
                  </div>
                )}

                {/* Why Interested */}
                {application.whyInterested && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">
                        Why Interested in This Position?
                      </h4>
                    </div>
                    <p className="text-gray-700">{application.whyInterested}</p>
                  </div>
                )}

                {/* Relevant Experience */}
                {application.relevantExperience && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <TrophyIcon className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">Relevant Experience</h4>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {application.relevantExperience}
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {application.expectedStartDate && (
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">
                          Expected Start Date
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatDate(application.expectedStartDate)}
                      </p>
                    </div>
                  )}

                  {application.availability && (
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">Availability</span>
                      </div>
                      <p className="font-semibold text-gray-900 capitalize">
                        {application.availability}
                      </p>
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {application.portfolio && (
                    <a
                      href={application.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Portfolio</span>
                    </a>
                  )}
                  {application.linkedIn && (
                    <a
                      href={application.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">LinkedIn</span>
                    </a>
                  )}
                  {application.github && (
                    <a
                      href={application.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">GitHub</span>
                    </a>
                  )}
                </div>

                {/* Additional Information */}
                {application.additionalInfo && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {application.additionalInfo}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Status Management */}
            <div className="lg:w-96 border-l bg-gray-50 p-6 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Application Status</h3>

              {/* Current Status */}
              <div className={`border-2 rounded-xl p-4 mb-6 ${statusConfig.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <StatusIcon className="w-6 h-6" />
                  <span className="font-bold text-lg">{statusConfig.label}</span>
                </div>
                <p className="text-sm opacity-90">{statusConfig.description}</p>
              </div>

              {/* Status Actions */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Update Status:</p>

                {status !== 'reviewing' && (
                  <button
                    onClick={() => handleStatusUpdate('reviewing')}
                    disabled={isUpdating}
                    className="w-full flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-700">Mark as Reviewing</span>
                  </button>
                )}

                {status !== 'interview' && status !== 'accepted' && status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusUpdate('interview')}
                    disabled={isUpdating}
                    className="w-full flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-700">Schedule Interview</span>
                  </button>
                )}

                {status !== 'accepted' && status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusUpdate('accepted')}
                    disabled={isUpdating}
                    className="w-full flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">Accept Application</span>
                  </button>
                )}

                {status !== 'rejected' && status !== 'accepted' && (
                  <button
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={isUpdating}
                    className="w-full flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-700">Reject Application</span>
                  </button>
                )}
              </div>

              {/* Internal Notes */}
              <div className="border-t pt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Internal Notes
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add private notes about this candidate..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  These notes are private and only visible to your team
                </p>
              </div>

              {/* Timeline */}
              <div className="border-t pt-6 mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Application Received</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(application.appliedAt || application.createdAt)}
                      </p>
                    </div>
                  </div>
                  {status !== 'pending' && (
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status Updated</p>
                        <p className="text-xs text-gray-500">Current: {statusConfig.label}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrophyIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

export default ApplicationDetailsModal;
