import React, { useState } from 'react';
import { Settings, Database, Zap, Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  createTestData,
  createTestCompanies,
  createTestStudents,
  testCredentials,
} from '../services/testDataService';

const DevPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [showCredentials, setShowCredentials] = useState(false);

  const handleCreateAll = async () => {
    setIsLoading(true);
    try {
      await createTestData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCompanies = async () => {
    setIsLoading(true);
    try {
      await createTestCompanies();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStudents = async () => {
    setIsLoading(true);
    try {
      await createTestStudents();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = text => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const togglePassword = key => {
    setShowPassword(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearLocalStorage = () => {
    if (window.confirm('Clear all local storage? This will remove saved preferences.')) {
      localStorage.clear();
      toast.success('Local storage cleared!');
      window.location.reload();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        title="Developer Panel (Press to open)"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full sm:w-96 bg-gray-900 text-white rounded-tl-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gray-950 p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h2 className="font-bold text-lg">Developer Panel</h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Setup Section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Quick Setup
          </h3>
          <div className="space-y-2">
            <button
              onClick={handleCreateAll}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Create All Test Data
                </>
              )}
            </button>
            <p className="text-xs text-gray-400">
              Creates 3 companies, 2 students, and 6 internships
            </p>
          </div>
        </div>

        {/* Individual Creation */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-400 mb-3">Create Individually</h3>
          <div className="space-y-2">
            <button
              onClick={handleCreateCompanies}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Companies Only
            </button>
            <button
              onClick={handleCreateStudents}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Students Only
            </button>
          </div>
        </div>

        {/* Test Credentials */}
        <div className="bg-gray-800 rounded-lg p-4">
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="w-full font-semibold text-left flex items-center justify-between mb-3 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>📋 Test Credentials</span>
            <span>{showCredentials ? '▼' : '▶'}</span>
          </button>

          {showCredentials && (
            <div className="space-y-3">
              {/* Companies */}
              <div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">COMPANIES:</p>
                {testCredentials.companies.map((company, idx) => (
                  <div key={idx} className="bg-gray-900 rounded p-2 mb-2 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{company.companyName}</span>
                      <button
                        onClick={() => handleCopyToClipboard(company.email)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 break-all">{company.email}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 flex-1 break-all">
                        {showPassword[`company-${idx}`] ? company.password : '••••••••••'}
                      </span>
                      <button
                        onClick={() => togglePassword(`company-${idx}`)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword[`company-${idx}`] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Students */}
              <div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">STUDENTS:</p>
                {testCredentials.students.map((student, idx) => (
                  <div key={idx} className="bg-gray-900 rounded p-2 mb-2 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">
                        {student.firstName} {student.lastName}
                      </span>
                      <button
                        onClick={() => handleCopyToClipboard(student.email)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 break-all">{student.email}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 flex-1 break-all">
                        {showPassword[`student-${idx}`] ? student.password : '••••••••••'}
                      </span>
                      <button
                        onClick={() => togglePassword(`student-${idx}`)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword[`student-${idx}`] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Utilities */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-red-400 mb-3">Utilities</h3>
          <button
            onClick={clearLocalStorage}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Local Storage
          </button>
        </div>

        {/* Info */}
        <div className="bg-gray-800 rounded-lg p-4 text-xs text-gray-400">
          <p className="mb-2">
            <strong className="text-gray-300">ℹ️ Info:</strong> Use this panel to create test
            accounts and internships.
          </p>
          <p className="mb-2">
            <strong className="text-gray-300">🔓 Visibility:</strong> This panel only appears in
            development mode.
          </p>
          <p>
            <strong className="text-gray-300">🔗 API Base:</strong>{' '}
            {process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevPanel;
