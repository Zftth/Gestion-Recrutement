import React, { useEffect, useState } from 'react';
import { Plus, Eye, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';

const JobOffersApp = () => {
  const [currentView, setCurrentView] = useState('list'); 
  const [jobOffers, setJobOffers] = useState([]);
  const API_URL = "http://localhost:8000/api/job-offers";
  const [newOffer, setNewOffer] = useState({ title: "", description: "", requirements: "", salary: "", location: "", contractType: "", experience: "", company: "", type: ""});

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        const data = await res.json();
        setJobOffers(data);
      } catch (err) {
        console.error("Erreur récupération offres:", err);
      } 
    };
    fetchOffers();
  }, []);

  const getStatusBadge = (status) => {
    if (status === 'ouverte') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          ouverte
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
        fermée
      </span>
    );
  };

  const handleView = (id) => {
    alert(`Voir l'offre ${id}`);
  };

  const handleEdit = async (id, updatedOffer) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedOffer)
    });

    const data = await res.json();

    if (res.ok) {
      setJobOffers(jobOffers.map(offer => offer.id === id ? data.offer : offer));
      alert("Offre mise à jour avec succès !");
    } else {
      alert("Erreur: " + data.message);
    }
  } catch (err) {
    console.error("Erreur modification offre:", err);
  }
};


  const handleDelete = async (id) => {
  if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      setJobOffers(jobOffers.filter(offer => offer.id !== id));
      alert(data.message);
    } else {
      alert("Erreur: " + data.message);
    }
  } catch (err) {
    console.error("Erreur suppression offre:", err);
  }
};


  const handleCreateOffer = () => {
    setCurrentView('create');
  };

 const handleSaveOffer = async () => {
  if (!newOffer.title || !newOffer.description) {
    alert("Veuillez remplir au moins le titre et la description");
    return;
  }
 

  try {
    const res = await fetch("http://localhost:8000/api/job-offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify({
        title: newOffer.title,
        description: newOffer.description,
        location: newOffer.location,
       requirements: newOffer.requirements, 
        salary: newOffer.salary,
        contractType: newOffer.contractType,
        experience: newOffer.experience,
        company: newOffer.company,
        type: newOffer.type
      })
    });

    const data = await res.json();

    if (res.ok) {
      setJobOffers([...jobOffers, data.offer]); 
      setCurrentView("list");
      setNewOffer({ title: "", description: "", requirements: "", salary: "", location: "", contractType: "", experience: "", company: "", type: ""});
      fetchOffers();
    } else {
      alert("Erreur: " + data.message);
    }
  } catch (err) {
    console.error("Erreur création offre:", err);
  }
};


  const handleCancel = () => {
    setCurrentView('list');
    setNewOffer({ title: '', description: '', requirements: '', salary: '', location: '', contractType: '', experience: '', company: '', type: ''});
  };

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Créer une nouvelle offre</h1>
                <p className="text-gray-600 mt-2">Remplissez les informations pour votre offre d'emploi</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Titre */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Titre du poste *
                </label>
                <input
                  type="text"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Développeur Full Stack"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description du poste *
                </label>
                <textarea
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Décrivez le poste, les missions principales..."
                />
              </div>

              {/* Exigences */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Exigences et qualifications
                </label>
                <textarea
                  value={newOffer.requirements}
                  onChange={(e) => setNewOffer({...newOffer, requirements: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Compétences requises, diplômes, expérience..."
                />
              </div>

              {/* Détails du poste */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={newOffer.location}
                    onChange={(e) => setNewOffer({...newOffer, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paris, Remote, Lyon..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Type de contrat
                  </label>
                  <select
                    value={newOffer.contractType}
                    onChange={(e) => setNewOffer({...newOffer, contractType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Stage">Stage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Niveau d'expérience
                  </label>
                  <select
                    value={newOffer.experience}
                    onChange={(e) => setNewOffer({...newOffer, experience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Junior">Junior (0-2 ans)</option>
                    <option value="Confirmé">Confirmé (2-5 ans)</option>
                    <option value="Senior">Senior (5+ ans)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Fourchette salariale
                  </label>
                  <input
                    type="text"
                    value={newOffer.salary}
                    onChange={(e) => setNewOffer({...newOffer, salary: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 45-55k€"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    value={newOffer.company}
                    onChange={(e) => setNewOffer({...newOffer, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Type
                  </label>
                  <select
                    value={newOffer.type}
                    onChange={(e) => setNewOffer({...newOffer, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Temps partiel">Temps partiel</option>
                    <option value="Temps plien">Temps plein</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Annuler</span>
              </button>
              <button
                onClick={handleSaveOffer}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Créer l'offre</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Offres d'emploi</h1>
            <p className="text-gray-600 text-lg">Gérez vos offres d'emploi et suivez les candidatures</p>
          </div>
          <button
            onClick={handleCreateOffer}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle offre</span>
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Liste des offres d'emploi</h2>
            <p className="text-gray-600">Toutes vos offres d'emploi et leur statut</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">Titre</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">Description</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">Statut</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">Candidatures</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">Date de création</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobOffers.map((offer, index) => (
                  <tr
                    key={offer.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index !== jobOffers.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <td className="py-6 px-6">
                      <div className="font-semibold text-gray-900">{offer.title}</div>
                    </td>
                    <td className="py-6 px-6 max-w-xs">
                      <div className="text-gray-600 truncate">{offer.description}</div>
                    </td>
                    <td className="py-6 px-6">{getStatusBadge(offer.status)}</td>
                    <td className="py-6 px-6">
                      <div className="font-semibold text-gray-900">{offer.candidates}</div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="text-gray-600">{offer.dateCreated}</div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(offer.id)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(offer.id)}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {jobOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">Aucune offre d'emploi</div>
              <button
                onClick={handleCreateOffer}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Créer votre première offre</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOffersApp;