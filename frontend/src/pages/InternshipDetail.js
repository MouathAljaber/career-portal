import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import ApplicationModal from '../components/ApplicationModal';
import {
  MapPin,
  Clock,
  Euro,
  Users,
  Bookmark,
  ArrowLeft,
  Share2,
  Building,
  Calendar,
  CheckCircle,
  X,
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { getInternshipById } from '../services/internshipService';

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { saveJob, unsaveJob, isJobSaved, applyToJob, isAuthenticated } = useAuth();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    const loadInternship = async () => {
      try {
        const data = await getInternshipById(id);
        setInternship(data);
      } catch (error) {
        console.error('Error loading internship:', error);
        toast.error('Internship not found');
        navigate('/search');
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [id, navigate]);

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for internships');
      navigate('/login');
      return;
    }
    setShowApplicationModal(true);
  };

  const submitApplication = async applicationData => {
    await applyToJob(internship.id, {
      ...internship,
      ...applicationData,
    });

    setShowApplicationModal(false);
  };

  const toggleBookmark = () => {
    if (!isAuthenticated) {
      toast.error('Please login to bookmark internships');
      navigate('/login');
      return;
    }

    if (isJobSaved(internship.id)) {
      unsaveJob(internship.id);
    } else {
      saveJob(internship.id, internship);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: internship.title,
        text: `Check out this internship at ${internship.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div
          className="flex items-center justify-center"
          style={{ minHeight: 'calc(100vh - 64px)' }}
        >
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading internship details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div
          className="flex items-center justify-center"
          style={{ minHeight: 'calc(100vh - 64px)' }}
        >
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Internship not found</p>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Internships
            </button>
          </div>
        </div>
      </div>
    );
  }

  const convertedStipend = convertCurrency(internship.stipend, 'EUR', currency.code);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>

          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm flex-shrink-0"
                  style={{ backgroundColor: internship.logoColor || '#3B82F6', color: 'white' }}
                >
                  {internship.logo || internship.company.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{internship.title}</h1>
                  <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                    <Building className="w-5 h-5" />
                    <span className="font-semibold">{internship.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(convertedStipend, currency.symbol)}/month
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{internship.applicants} applicants</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 ml-4">
                <button
                  onClick={toggleBookmark}
                  className={`p-3 rounded-lg border transition-all ${
                    isJobSaved(internship.id)
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200'
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${isJobSaved(internship.id) ? 'fill-current' : ''}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-200 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {internship.type}
              </span>
              {internship.isHot && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  🔥 Hot
                </span>
              )}
              {internship.isNew && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ✨ New
                </span>
              )}
              {internship.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Apply Now
            </button>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Internship</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {internship.description ||
                `Join ${internship.company} as a ${internship.title}. This is an exciting opportunity to work with cutting-edge technologies and gain valuable experience in a professional environment.`}
            </p>
          </div>

          {/* Requirements */}
          {internship.requirements && internship.requirements.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {internship.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities */}
          {internship.responsibilities && internship.responsibilities.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {internship.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Deadlines */}
          {(internship.deadline || internship.startDate) && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {internship.deadline && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Application Deadline</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(internship.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {internship.startDate && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(internship.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        internship={internship}
        onSubmit={submitApplication}
      />

      <Footer />
    </div>
  );
};

export default InternshipDetail;
