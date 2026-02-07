import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageCircle, Star, Users } from 'lucide-react';
import Header from '../components/homepage/Header';

const mentorsSeed = [
  {
    id: 'mentor-1',
    name: 'Dr. Julia Schmidt',
    role: 'Product Lead',
    company: 'Google',
    rating: 4.9,
    sessions: 152,
    specialties: ['Product Strategy', 'Roadmapping', 'Growth'],
    availability: 'Next available: Tue 3 PM',
    bio: '15+ years building consumer products with global scale.',
  },
  {
    id: 'mentor-2',
    name: 'Anil Kapoor',
    role: 'Engineering Manager',
    company: 'Microsoft',
    rating: 4.8,
    sessions: 98,
    specialties: ['Frontend', 'Architecture', 'Career Coaching'],
    availability: 'Next available: Thu 11 AM',
    bio: 'Former startup founder and engineering leader.',
  },
  {
    id: 'mentor-3',
    name: 'Sofia Alvarez',
    role: 'Data Science Lead',
    company: 'Spotify',
    rating: 4.7,
    sessions: 110,
    specialties: ['Data Analytics', 'SQL', 'Machine Learning'],
    availability: 'Next available: Mon 5 PM',
    bio: 'Specialized in data-driven product decisions.',
  },
];

const Mentorship = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messagingMentor, setMessagingMentor] = useState(null);
  const [requests, setRequests] = useState(() => {
    const stored = localStorage.getItem('mentorshipRequests');
    return stored ? JSON.parse(stored) : [];
  });
  const [messageDraft, setMessageDraft] = useState('');
  const [sessions, setSessions] = useState(() => {
    const stored = localStorage.getItem('mentorshipSessions');
    return stored ? JSON.parse(stored) : [];
  });
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    localStorage.setItem('mentorshipRequests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('mentorshipSessions', JSON.stringify(sessions));
  }, [sessions]);

  const filteredMentors = useMemo(() => {
    if (!search) return mentorsSeed;
    return mentorsSeed.filter(mentor =>
      [mentor.name, mentor.role, mentor.company, ...mentor.specialties]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const handleRequest = mentor => {
    setSelectedMentor(mentor);
  };

  const handleSubmitRequest = () => {
    if (!selectedMentor || !formData.topic || !formData.date || !formData.time) return;
    const newRequest = {
      id: `${selectedMentor.id}-${Date.now()}`,
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      topic: formData.topic,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      status: 'Pending',
    };
    setRequests(prev => [newRequest, ...prev]);
    setSessions(prev => [
      {
        id: newRequest.id,
        mentor: selectedMentor.name,
        topic: formData.topic,
        date: formData.date,
        time: formData.time,
        status: 'Scheduled',
      },
      ...prev,
    ]);
    setFormData({ topic: '', date: '', time: '', notes: '' });
    setSelectedMentor(null);
  };

  const handleSendMessage = mentor => {
    if (!mentor || !messageDraft.trim()) return;
    const newMessage = {
      id: `${mentor.id}-${Date.now()}`,
      mentorId: mentor.id,
      mentorName: mentor.name,
      message: messageDraft,
      timestamp: new Date().toISOString(),
    };
    const stored = localStorage.getItem('mentorshipMessages');
    const messages = stored ? JSON.parse(stored) : [];
    localStorage.setItem('mentorshipMessages', JSON.stringify([newMessage, ...messages]));
    setMessageDraft('');
    setMessagingMentor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-blue-600 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mentorship</h1>
            <p className="text-gray-600 mt-2">
              Connect with industry mentors for personalized guidance and career growth.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-6">
            <div>
              <p className="text-xs uppercase text-gray-500">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Requests</p>
              <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Mentors</p>
              <p className="text-2xl font-bold text-gray-900">{mentorsSeed.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Find a Mentor</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                {filteredMentors.length} mentors
              </div>
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by skill, role, or company"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-6"
            />
            <div className="space-y-4">
              {filteredMentors.map(mentor => (
                <div key={mentor.id} className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">
                        {mentor.role} • {mentor.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      {mentor.rating}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {mentor.specialties.map(skill => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-500">{mentor.availability}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRequest(mentor)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                      >
                        Request Session
                      </button>
                      <button
                        onClick={() => setMessagingMentor(mentor)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <p className="text-sm text-gray-600">No sessions scheduled yet.</p>
              ) : (
                sessions.map(session => (
                  <div key={session.id} className="border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-900">{session.topic}</p>
                    <p className="text-xs text-gray-600">{session.mentor}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Calendar className="w-4 h-4" />
                      {session.date} • {session.time}
                    </div>
                    <span className="text-xs mt-2 inline-block text-green-600">
                      {session.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h2>
          {messagingMentor && (
            <p className="text-sm text-gray-600 mb-2">Messaging {messagingMentor.name}</p>
          )}
          <textarea
            rows={3}
            value={messageDraft}
            onChange={e => setMessageDraft(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4"
            placeholder="Write a quick update to your mentor..."
          />
          <button
            onClick={() => handleSendMessage(messagingMentor)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Send Message
          </button>
          {!messagingMentor && (
            <p className="text-xs text-gray-500 mt-2">
              Select a mentor from the list to send a message.
            </p>
          )}
        </div>
      </div>

      {selectedMentor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Request a Session</h3>
                <p className="text-sm text-gray-600">with {selectedMentor.name}</p>
              </div>
              <button onClick={() => setSelectedMentor(null)} className="text-gray-500">
                Close
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Topic</label>
                <input
                  value={formData.topic}
                  onChange={e => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Interview prep, roadmap, portfolio review"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Share your goals or any context"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedMentor(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentorship;
