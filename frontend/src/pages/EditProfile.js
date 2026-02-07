import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { Eye, EyeOff, CheckCircle, Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Container,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Profile Form State - Initialize from user context
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    // Student fields
    university: user?.university || '',
    degree: user?.degree || '',
    year: user?.year || '',
    skills: user?.skills || '',
    // Company fields
    companyName: user?.companyName || '',
    industry: user?.industry || '',
    companySize: user?.companySize || '',
    location: user?.location || '',
    companyDescription: user?.companyDescription || '',
  });

  // Email Form State
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    confirmEmail: '',
    password: '',
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Handle Profile Form Change
  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle Email Form Change
  const handleEmailChange = e => {
    const { name, value } = e.target;
    setEmailForm(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle Password Form Change
  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate Email
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate Password
  const validatePassword = password => {
    return password.length >= 8;
  };

  // Handle Profile Save
  const handleProfileSave = async () => {
    const newErrors = {};

    if (!profileForm.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!profileForm.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!profileForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(profileForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Update user in context and localStorage
      updateUser({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        phone: profileForm.phone,
        bio: profileForm.bio,
        university: profileForm.university,
        degree: profileForm.degree,
        year: profileForm.year,
        skills: profileForm.skills,
        companyName: profileForm.companyName,
        industry: profileForm.industry,
        companySize: profileForm.companySize,
        location: profileForm.location,
        companyDescription: profileForm.companyDescription,
      });

      setLoading(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      setLoading(false);
      toast.error('Failed to update profile');
    }
  };

  // Handle Email Change
  const handleEmailSave = async () => {
    const newErrors = {};

    if (!emailForm.newEmail.trim()) {
      newErrors.newEmail = 'New email is required';
    } else if (!validateEmail(emailForm.newEmail)) {
      newErrors.newEmail = 'Please enter a valid email';
    }

    if (!emailForm.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (emailForm.newEmail !== emailForm.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    if (!emailForm.password.trim()) {
      newErrors.password = 'Password is required for security';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Email updated successfully! Please verify your new email.');
      setEmailForm({
        newEmail: '',
        confirmEmail: '',
        password: '',
      });
    }, 1500);
  };

  // Handle Password Change
  const handlePasswordSave = async () => {
    const newErrors = {};

    if (!passwordForm.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (!validatePassword(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordForm.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header Section */}
      <div className="bg-blue-700 text-white pt-28 pb-16 sm:pt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Account Settings</h1>
            <p className="text-xl text-blue-100">
              Manage your profile, email, and security settings
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card sx={{ boxShadow: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ px: 3 }}
            >
              <Tab
                label="Profile Information"
                icon={<User className="w-4 h-4" />}
                iconPosition="start"
              />
              <Tab label="Email Address" icon={<Mail className="w-4 h-4" />} iconPosition="start" />
              <Tab
                label="Password & Security"
                icon={<Lock className="w-4 h-4" />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Profile Tab */}
            {activeTab === 0 && (
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-6">
                    Update your basic profile information. This helps employers learn more about
                    you.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileForm.firstName}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileForm.lastName}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter email"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    University (Optional)
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={profileForm.university}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., Technical University of Berlin"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Degree (Optional)
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={profileForm.degree}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Year (Optional)
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={profileForm.year}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., 3rd Year"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about yourself"
                  />
                  <p className="text-sm text-gray-500 mt-1">{profileForm.bio.length}/500</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Skills (Optional)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={profileForm.skills}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., React, Python, Machine Learning"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
                </div>

                {/* Company-specific fields */}
                {user?.role === 'company' && (
                  <>
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={profileForm.companyName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="e.g., Tech Innovation GmbH"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          name="industry"
                          value={profileForm.industry}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                          placeholder="e.g., Information Technology"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Company Size
                        </label>
                        <input
                          type="text"
                          name="companySize"
                          value={profileForm.companySize}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                          placeholder="e.g., 100-500 employees"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="e.g., Berlin, Germany"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Company Description
                      </label>
                      <textarea
                        name="companyDescription"
                        value={profileForm.companyDescription}
                        onChange={handleProfileChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Describe your company and what makes it unique"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleProfileSave}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    Save Changes
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Email Tab */}
            {activeTab === 1 && (
              <div className="space-y-6">
                <Alert severity="info" sx={{ mb: 4 }}>
                  Changing your email will require verification. You'll receive a confirmation link
                  at your new email address.
                </Alert>

                <div>
                  <p className="text-gray-600 mb-6">
                    Current Email:{' '}
                    <span className="font-semibold text-gray-900">{profileForm.email}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    name="newEmail"
                    value={emailForm.newEmail}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.newEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter new email address"
                  />
                  {errors.newEmail && (
                    <p className="text-red-600 text-sm mt-1">{errors.newEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Confirm Email Address
                  </label>
                  <input
                    type="email"
                    name="confirmEmail"
                    value={emailForm.confirmEmail}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.confirmEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm new email address"
                  />
                  {errors.confirmEmail && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Current Password (for security)
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="password"
                      value={emailForm.password}
                      onChange={handleEmailChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords(prev => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleEmailSave}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    Update Email
                  </button>
                  <button
                    onClick={() => {
                      setEmailForm({ newEmail: '', confirmEmail: '', password: '' });
                      setErrors({});
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 2 && (
              <div className="space-y-6">
                <Alert severity="warning" sx={{ mb: 4 }}>
                  Use a strong password with at least 8 characters, including uppercase, lowercase,
                  numbers, and symbols.
                </Alert>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12 ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords(prev => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12 ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords(prev => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
                  )}
                  <div className="mt-3 space-y-2">
                    <div
                      className={`flex items-center gap-2 text-sm ${passwordForm.newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}
                    >
                      <span className={passwordForm.newPassword.length >= 8 ? '✓' : '○'}>
                        At least 8 characters
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords(prev => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handlePasswordSave}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    Change Password
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                      setErrors({});
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </div>
  );
};

export default EditProfile;
