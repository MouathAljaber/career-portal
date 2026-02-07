import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { CloudUpload, FileText, CheckCircle, X, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const UploadResume = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = file => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleChange = e => {
    const files = e.target.files;
    processFiles(files);
  };

  const processFiles = files => {
    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        validFiles.push({
          id: Math.random(),
          name: files[i].name,
          size: (files[i].size / 1024 / 1024).toFixed(2),
          type: files[i].type,
          uploadedAt: new Date().toLocaleString(),
          status: 'completed',
        });
      }
    }

    if (validFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
      toast.success(`${validFiles.length} file(s) uploaded successfully!`);
    }
  };

  const removeFile = id => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    toast.success('File removed');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header Section */}
      <div className="bg-blue-700 text-white pt-28 pb-16 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Your Resume</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Upload your resume to apply for internships and jobs in Germany. Make it easy for
              employers to find you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Upload Area */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Resume</h2>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 bg-gray-50 hover:border-blue-400'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                multiple
              />

              <label htmlFor="file-upload" className="cursor-pointer block">
                <CloudUpload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drag and drop your resume here
                </h3>
                <p className="text-gray-600 mb-4">or click to select files from your computer</p>
                <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              </label>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Uploaded Files ({uploadedFiles.length})
              </h3>
              <div className="space-y-3">
                {uploadedFiles.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-600">
                          {file.size} MB • Uploaded {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Remove file"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Resume Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Keep your resume concise and well-organized (1-2 pages)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include relevant skills, education, and work experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Use clear headings and bullet points for easy reading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Highlight your accomplishments and quantifiable results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Tailor your resume to match the job description</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Proofread for spelling and grammar errors</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer group">
              <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                What file formats are accepted?
                <span className="text-xl">+</span>
              </summary>
              <p className="mt-4 text-gray-700">
                We accept PDF, Microsoft Word (.doc, .docx) files up to 5MB in size. PDF format is
                recommended for consistent formatting across different devices.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer group">
              <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                Can I upload multiple resumes?
                <span className="text-xl">+</span>
              </summary>
              <p className="mt-4 text-gray-700">
                Yes, you can upload multiple resumes. You can have different versions tailored for
                different types of positions and switch between them when applying.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer group">
              <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                Is my resume safe and private?
                <span className="text-xl">+</span>
              </summary>
              <p className="mt-4 text-gray-700">
                Yes, your resume is securely stored and only shared with employers you apply to. We
                follow GDPR regulations and take data privacy seriously.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer group">
              <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                Can I edit my resume after uploading?
                <span className="text-xl">+</span>
              </summary>
              <p className="mt-4 text-gray-700">
                Yes, you can remove and re-upload updated versions of your resume at any time.
                Simply remove the old version and upload the new one.
              </p>
            </details>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadResume;
