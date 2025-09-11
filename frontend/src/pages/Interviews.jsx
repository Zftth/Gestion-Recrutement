import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, User, Plus, Edit, Eye } from 'lucide-react';

const InterviewManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [interviewType, setInterviewType] = useState('video');
  
  const [formData, setFormData] = useState({
    candidateName: '',
    position: '',
    date: '',
    time: '',
    link: '',
    notes: ''
  });

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      position: 'Développeur Frontend React',
      date: '20/01/2024',
      time: '14:00',
      type: 'video',
      link: 'Google Meet',
      status: 'programmé'
    },
    {
      id: 2,
      name: 'Pierre Martin',
      position: 'Designer UX/UI Senior',
      date: '22/01/2024',
      time: '10:30',
      type: 'presential',
      location: 'Bureau Paris - Salle A',
      status: 'programmé'
    }
  ]);

  const [completedInterviews, setCompletedInterviews] = useState([
    {
      id: 3,
      name: 'Sophie Laurent',
      position: 'Chef de Projet Digital',
      date: '18/01/2024',
      time: '16:00',
      status: 'terminé',
      hasNotes: true
    }
  ]);

  const [stats, setStats] = useState({
    scheduled: 2,
    completed: 1,
    total: 3
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.candidateName && formData.position && formData.date && formData.time) {
      const newInterview = {
        id: Date.now(),
        name: formData.candidateName,
        position: formData.position,
        date: formData.date,
        time: formData.time,
        type: interviewType,
        ...(interviewType === 'video' ? { link: formData.link || 'Google Meet' } : { location: formData.link }),
        status: 'programmé'
      };
      
      setUpcomingInterviews(prev => [...prev, newInterview]);
      setStats(prev => ({
        ...prev,
        scheduled: prev.scheduled + 1,
        total: prev.total + 1
      }));
      
      // Reset form
      setFormData({
        candidateName: '',
        position: '',
        date: '',
        time: '',
        link: '',
        notes: ''
      });
      setShowModal(false);
    }
  };

  const moveToCompleted = (interviewId) => {
    const interview = upcomingInterviews.find(i => i.id === interviewId);
    if (interview) {
      setCompletedInterviews(prev => [...prev, { ...interview, status: 'terminé', hasNotes: false }]);
      setUpcomingInterviews(prev => prev.filter(i => i.id !== interviewId));
      setStats(prev => ({
        ...prev,
        scheduled: prev.scheduled - 1,
        completed: prev.completed + 1
      }));
    }
  };

  const InterviewCard = ({ interview, type }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{interview.name}</h3>
            <p className="text-sm text-gray-600">{interview.position}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {type === 'upcoming' && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {interview.status}
            </span>
          )}
          {type === 'completed' && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {interview.status}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{interview.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{interview.time}</span>
        </div>
        {interview.type === 'video' && interview.link && (
          <div className="flex items-center space-x-1">
            <Video className="w-4 h-4" />
            <span>{interview.link}</span>
          </div>
        )}
        {interview.location && (
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{interview.location}</span>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex justify-end space-x-2">
        {type === 'upcoming' && (
          <>
            <button 
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              onClick={() => console.log('Modifier', interview.id)}
            >
              Modifier
            </button>
            <button 
              className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
              onClick={() => moveToCompleted(interview.id)}
            >
              Marquer comme terminé
            </button>
          </>
        )}
        {type === 'completed' && (
          <button 
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors flex items-center space-x-1"
            onClick={() => console.log('Voir notes', interview.id)}
          >
            <Eye className="w-4 h-4" />
            <span>Voir notes</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Entretiens</h1>
            <p className="text-gray-600 mt-1">Planifiez et gérez vos entretiens</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Programmer un entretien</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.scheduled}</div>
            <div className="text-gray-600">Programmés</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.completed}</div>
            <div className="text-gray-600">Terminés</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-700 mb-2">{stats.total}</div>
            <div className="text-gray-600">Total</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'upcoming' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entretiens à venir
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'completed' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Historique
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {activeTab === 'upcoming' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Entretiens à venir</h2>
              <p className="text-gray-600 mb-6">Prochains entretiens programmés</p>
              <div className="space-y-4">
                {upcomingInterviews.map(interview => (
                  <InterviewCard key={interview.id} interview={interview} type="upcoming" />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'completed' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Entretiens terminés</h2>
              <p className="text-gray-600 mb-6">Historique des entretiens passés</p>
              <div className="space-y-4">
                {completedInterviews.map(interview => (
                  <InterviewCard key={interview.id} interview={interview} type="completed" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold mb-4">Programmer un entretien</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du candidat
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Alice Martin"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Poste
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Développeur React"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'entretien
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setInterviewType('video')}
                      className={`flex-1 p-2 rounded-md border text-sm font-medium transition-colors ${
                        interviewType === 'video'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Video className="w-4 h-4 inline mr-1" />
                      Visioconférence
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterviewType('presential')}
                      className={`flex-1 p-2 rounded-md border text-sm font-medium transition-colors ${
                        interviewType === 'presential'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <User className="w-4 h-4 inline mr-1" />
                      Présentiel
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {interviewType === 'video' ? 'Lien / Lieu' : 'Lieu'}
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder={interviewType === 'video' ? 'Lien Google Meet / Zoom' : 'Bureau Paris - Salle A'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optionnel)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Notes sur l'entretien..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Programmer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewManagement;