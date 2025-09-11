import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('search');
  const [selectedJob, setSelectedJob] = useState(null);
  const [contractType, setContractType] = useState('Tous');

  // Données des offres d'emploi
  const jobOffers = [
    {
      id: 1,
      title: "Développeur React",
      company: "TechCorp",
      location: "Paris",
      posted: "Publié il y a 2 jours",
      salary: "45-55k€"
    },
    {
      id: 2,
      title: "Designer UX/UI",
      company: "DesignStudio",
      location: "Lyon",
      posted: "Publié il y a 1 semaine",
      salary: "40-50k€"
    }
  ];

  // Options pour le type de contrat
  const contractOptions = ['Tous', 'CDI', 'CDD', 'Freelance', 'Stage'];

  // Fonction pour gérer le clic sur "Postuler"
  const handleApply = (job) => {
    setSelectedJob(job);
    setCurrentPage('application');
  };

  // Fonction pour retourner à la page de recherche
  const handleBackToSearch = () => {
    setCurrentPage('search');
  };

  // Gestion du changement de type de contrat
  const handleContractChange = (e) => {
    setContractType(e.target.value);
  };

  // Page de recherche
  const SearchPage = () => (
    <div className="search-page">
      <h1>Rechercher des offres</h1>
      
      <div className="search-form">
        <div className="form-group">
          <label>Recherche</label>
          <input type="text" placeholder="Poste, entreprise..." />
        </div>
        
        <div className="form-group">
          <label>Localisation</label>
          <input type="text" placeholder="Ville, région..." />
        </div>
        
        <div className="form-group">
          <label>Type de contrat</label>
          <select value={contractType} onChange={handleContractChange}>
            {contractOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <button className="search-button">Rechercher</button>
      </div>

      <div className="featured-offers">
        <h2>Offre mise en avant</h2>
        
        {jobOffers.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p className="company">{job.company}</p>
            <p className="location">{job.location}</p>
            <p className="posted">{job.posted}</p>
            <p className="salary">{job.salary}</p>
            <button 
              className="apply-button"
              onClick={() => handleApply(job)}
            >
              Postuler
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Page de candidature
  const ApplicationPage = () => (
    <div className="application-page">
      <button className="back-button" onClick={handleBackToSearch}>
        ← Retour
      </button>
      
      <h1>Rechercher des offres</h1>
      
      <div className="search-form">
        <div className="form-group">
          <label>Recherche</label>
          <input type="text" placeholder="Poste, entreprise..." />
        </div>
      </div>

      <div className="application-container">
        <div className="job-info">
          <h2>{selectedJob.title}</h2>
          <p className="company">{selectedJob.company} - {selectedJob.location}</p>
          <p className="salary">{selectedJob.salary}</p>
        </div>

        <div className="cv-section">
          <h3>CV (PDF)</h3>
          <div className="file-upload">
            <p>Cliquez pour télécharger votre CV</p>
            <p>ou glissez-déposez votre fichier PDF</p>
          </div>
        </div>

        <div className="cover-letter">
          <h3>Lettre de motivation</h3>
          <textarea 
            placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
            rows="6"
          ></textarea>
        </div>

        <button className="submit-application">Envoyer la candidature</button>
      </div>
    </div>
  );

  return (
    <div className="App">
      {currentPage === 'search' ? <SearchPage /> : <ApplicationPage />}
    </div>
  );
}

export default App;