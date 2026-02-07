import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, Calendar, FileText } from 'lucide-react';

const NotificationToast = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'application_submitted':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'status_change':
        if (notification.metadata?.newStatus === 'accepted') {
          return <CheckCircle className="w-6 h-6 text-green-500" />;
        } else if (notification.metadata?.newStatus === 'interview') {
          return <Calendar className="w-6 h-6 text-purple-500" />;
        } else if (notification.metadata?.newStatus === 'rejected') {
          return <AlertCircle className="w-6 h-6 text-red-500" />;
        }
        return <Info className="w-6 h-6 text-blue-500" />;
      case 'new_application':
        return <FileText className="w-6 h-6 text-blue-500" />;
      default:
        return <Info className="w-6 h-6 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.color) {
      case 'green':
        return 'bg-green-50 border-green-200';
      case 'blue':
        return 'bg-blue-50 border-blue-200';
      case 'purple':
        return 'bg-purple-50 border-purple-200';
      case 'red':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } max-w-md w-full bg-white border-2 ${getBackgroundColor()} rounded-xl shadow-lg p-4 mb-3`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">{notification.title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{notification.message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const NotificationContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleNewNotification = event => {
      const notification = event.detail.notification;
      setToasts(prev => [...prev, notification]);
    };

    window.addEventListener('notificationAdded', handleNewNotification);
    return () => window.removeEventListener('notificationAdded', handleNewNotification);
  }, []);

  const removeToast = id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-[100] pointer-events-none">
      <div className="pointer-events-auto space-y-3">
        {toasts.map(toast => (
          <NotificationToast
            key={toast.id}
            notification={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;
