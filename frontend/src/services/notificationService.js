// Notification Service - Manages notifications for both students and companies

class NotificationService {
  constructor() {
    this.STUDENT_KEY = 'studentNotifications';
    this.COMPANY_KEY = 'companyNotifications';
  }

  // Get all notifications for a user
  getNotifications(userType = 'student') {
    const key = userType === 'company' ? this.COMPANY_KEY : this.STUDENT_KEY;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  }

  // Add a new notification
  addNotification(notification, userType = 'student') {
    const key = userType === 'company' ? this.COMPANY_KEY : this.STUDENT_KEY;
    const notifications = this.getNotifications(userType);

    const newNotification = {
      id: Date.now() + Math.random(),
      read: false,
      timestamp: new Date().toISOString(),
      ...notification,
    };

    const updated = [newNotification, ...notifications].slice(0, 50); // Keep last 50
    localStorage.setItem(key, JSON.stringify(updated));

    // Trigger custom event for real-time updates
    window.dispatchEvent(
      new CustomEvent('notificationAdded', {
        detail: { notification: newNotification, userType },
      })
    );

    return newNotification;
  }

  // Mark notification as read
  markAsRead(notificationId, userType = 'student') {
    const key = userType === 'company' ? this.COMPANY_KEY : this.STUDENT_KEY;
    const notifications = this.getNotifications(userType);

    const updated = notifications.map(n => (n.id === notificationId ? { ...n, read: true } : n));

    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  }

  // Mark all notifications as read
  markAllAsRead(userType = 'student') {
    const key = userType === 'company' ? this.COMPANY_KEY : this.STUDENT_KEY;
    const notifications = this.getNotifications(userType);

    const updated = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  }

  // Delete a notification
  deleteNotification(notificationId, userType = 'student') {
    const key = userType === 'company' ? this.COMPANY_KEY : this.STUDENT_KEY;
    const notifications = this.getNotifications(userType);

    const updated = notifications.filter(n => n.id !== notificationId);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  }

  // Get unread count
  getUnreadCount(userType = 'student') {
    const notifications = this.getNotifications(userType);
    return notifications.filter(n => !n.read).length;
  }

  // Clear all notifications
  clearAll(userType = 'student') {
    const key = userType === 'company' ? this.COMPANY_KEY : this.STUDENT_KEY;
    localStorage.removeItem(key);
  }

  // Student-specific: Application submitted notification
  notifyApplicationSubmitted(internshipData) {
    return this.addNotification(
      {
        type: 'application_submitted',
        title: 'Application Submitted',
        message: `Your application to ${internshipData.company} for ${internshipData.title} has been submitted successfully!`,
        icon: '✓',
        color: 'green',
        actionUrl: '/portal',
        metadata: {
          internshipId: internshipData.id,
          company: internshipData.company,
          position: internshipData.title,
        },
      },
      'student'
    );
  }

  // Student-specific: Status update notification
  notifyStatusChange(internshipData, oldStatus, newStatus) {
    const statusMessages = {
      reviewing: {
        title: 'Application Under Review',
        message: `${internshipData.company} is now reviewing your application for ${internshipData.title}`,
        icon: '👀',
        color: 'blue',
      },
      interview: {
        title: 'Interview Invitation! 🎉',
        message: `Congratulations! ${internshipData.company} has invited you for an interview for ${internshipData.title}`,
        icon: '📅',
        color: 'purple',
      },
      accepted: {
        title: 'Application Accepted! 🎊',
        message: `Great news! ${internshipData.company} has accepted your application for ${internshipData.title}`,
        icon: '🎉',
        color: 'green',
      },
      rejected: {
        title: 'Application Update',
        message: `${internshipData.company} has decided to move forward with other candidates for ${internshipData.title}`,
        icon: 'ℹ️',
        color: 'red',
      },
    };

    const config = statusMessages[newStatus] || {
      title: 'Application Status Updated',
      message: `Your application status for ${internshipData.title} at ${internshipData.company} has been updated to ${newStatus}`,
      icon: '📢',
      color: 'gray',
    };

    return this.addNotification(
      {
        type: 'status_change',
        ...config,
        actionUrl: '/portal',
        metadata: {
          internshipId: internshipData.id,
          company: internshipData.company,
          position: internshipData.title,
          oldStatus,
          newStatus,
        },
      },
      'student'
    );
  }

  // Company-specific: New application notification
  notifyNewApplication(applicationData) {
    return this.addNotification(
      {
        type: 'new_application',
        title: 'New Application Received',
        message: `${applicationData.studentName || 'A candidate'} has applied for ${applicationData.position}`,
        icon: '📝',
        color: 'blue',
        actionUrl: '/company-portal',
        metadata: {
          applicationId: applicationData.id,
          studentName: applicationData.studentName,
          position: applicationData.position,
          internshipId: applicationData.internshipId,
        },
      },
      'company'
    );
  }

  // Company-specific: Application milestone notification
  notifyApplicationMilestone(milestone, applicationData) {
    const milestones = {
      interview_scheduled: {
        title: 'Interview Scheduled',
        message: `Interview scheduled with ${applicationData.studentName} for ${applicationData.position}`,
        icon: '📅',
        color: 'purple',
      },
      offer_sent: {
        title: 'Offer Extended',
        message: `Offer sent to ${applicationData.studentName} for ${applicationData.position}`,
        icon: '✉️',
        color: 'green',
      },
    };

    const config = milestones[milestone] || {
      title: 'Application Update',
      message: `Update on application from ${applicationData.studentName}`,
      icon: '📢',
      color: 'gray',
    };

    return this.addNotification(
      {
        type: 'milestone',
        ...config,
        actionUrl: '/company-portal',
        metadata: {
          applicationId: applicationData.id,
          studentName: applicationData.studentName,
          position: applicationData.position,
        },
      },
      'company'
    );
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;
