import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { authAPI, internshipAPI, studentAPI } from '../services/api';
import notificationService from '../services/notificationService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPreferences, setUserPreferences] = useState(() => {
    const stored = localStorage.getItem('userPreferences');
    return stored
      ? JSON.parse(stored)
      : {
          theme: 'light',
          notifications: true,
          emailUpdates: true,
          savedJobs: [],
          appliedJobs: [],
          viewedJobs: [],
          searchHistory: [],
        };
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = authAPI.getCurrentUser();
      const isAuth = authAPI.isAuthenticated();

      if (isAuth && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Register function
  const register = async userData => {
    try {
      const response = await authAPI.register(userData);

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success('Registration successful!');
      return { success: true, user: response.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Login function
  const login = async credentials => {
    try {
      const response = await authAPI.login(credentials);

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success('Login successful!');
      return { success: true, user: response.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    authAPI.logout();
    localStorage.removeItem('userPreferences');
    setUser(null);
    setIsAuthenticated(false);
    setUserPreferences({
      theme: 'light',
      notifications: true,
      emailUpdates: true,
      savedJobs: [],
      appliedJobs: [],
      viewedJobs: [],
      searchHistory: [],
    });
    toast.success('Logged out successfully');
  };

  // Update user function
  const updateUser = userData => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Update user preferences
  const updatePreferences = newPreferences => {
    const updated = { ...userPreferences, ...newPreferences };
    setUserPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));
  };

  // Save job for student - with backend integration
  const saveJob = async (jobId, jobDetails) => {
    const existingJob = userPreferences.savedJobs.find(j => j.id === jobId);
    if (!existingJob) {
      // Update local state immediately
      updatePreferences({
        savedJobs: [
          ...userPreferences.savedJobs,
          {
            id: jobId,
            ...jobDetails,
            savedAt: new Date().toISOString(),
          },
        ],
      });

      // Sync with backend if authenticated
      if (isAuthenticated) {
        try {
          await studentAPI.toggleBookmark(jobId);
        } catch (error) {
          console.error('Error syncing bookmark:', error);
        }
      }

      toast.success('Internship bookmarked!');
      return true;
    }
    return false;
  };

  // Remove saved job - with backend integration
  const unsaveJob = async jobId => {
    updatePreferences({
      savedJobs: userPreferences.savedJobs.filter(j => j.id !== jobId),
    });

    // Sync with backend if authenticated
    if (isAuthenticated) {
      try {
        await studentAPI.toggleBookmark(jobId);
      } catch (error) {
        console.error('Error syncing bookmark removal:', error);
      }
    }

    toast.success('Bookmark removed');
  };

  // Check if job is saved
  const isJobSaved = jobId => {
    return userPreferences.savedJobs.some(j => j.id === jobId);
  };

  // Apply to job - now with backend integration
  const applyToJob = async (jobId, jobDetails) => {
    if (!userPreferences.appliedJobs.find(j => j.id === jobId)) {
      // Update local state immediately for better UX
      updatePreferences({
        appliedJobs: [
          ...userPreferences.appliedJobs,
          {
            id: jobId,
            ...jobDetails,
            appliedAt: new Date().toISOString(),
          },
        ],
      });

      // Call backend API to increment applicants
      try {
        await internshipAPI.apply(jobId, {
          resume: jobDetails.resume,
          coverLetter: jobDetails.coverLetter,
          ...jobDetails,
        });

        // Add notification for student
        notificationService.notifyApplicationSubmitted({
          id: jobId,
          company: jobDetails.company,
          title: jobDetails.title,
        });

        // Add notification for company
        notificationService.notifyNewApplication({
          id: Date.now(),
          studentName:
            user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email,
          position: jobDetails.title,
          internshipId: jobId,
        });

        toast.success('Application submitted successfully!');
        return true;
      } catch (error) {
        // If backend fails, still keep local application for demo purposes
        console.error('Backend application failed:', error);

        // Still notify student
        notificationService.notifyApplicationSubmitted({
          id: jobId,
          company: jobDetails.company,
          title: jobDetails.title,
        });

        toast.success('Application submitted successfully!');
        return true;
      }
    }
    toast('You already applied to this position');
    return false;
  };

  // Track job view
  const viewJob = jobId => {
    const viewedJobs = userPreferences.viewedJobs.filter(id => id !== jobId);
    updatePreferences({
      viewedJobs: [jobId, ...viewedJobs].slice(0, 50), // Keep last 50
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        userPreferences,
        register,
        login,
        logout,
        updateUser,
        updatePreferences,
        saveJob,
        unsaveJob,
        isJobSaved,
        applyToJob,
        viewJob,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
