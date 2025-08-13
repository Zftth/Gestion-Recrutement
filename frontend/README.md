# RecrutApp Frontend

Application React moderne pour la gestion de recrutement, développée avec Vite et TailwindCSS.

## 🚀 Fonctionnalités

### Authentification & Autorisation
- Connexion/Inscription sécurisée
- Gestion des rôles (Admin, Recruteur, Candidat)
- Protection des routes par rôle
- Gestion automatique des tokens JWT

### Gestion des Offres d'Emploi
- CRUD complet pour les administrateurs et recruteurs
- Consultation et candidature pour les candidats
- Filtres avancés (titre, localisation, type de contrat)
- Interface responsive et moderne

### Système de Candidatures
- Candidature avec lettre de motivation
- Suivi des statuts (en cours, entretien, accepté, refusé)
- Gestion différenciée selon les rôles
- Notifications en temps réel

### Gestion des Entretiens
- Planification d'entretiens (présentiel, visio, téléphone)
- Calendrier intégré
- Notifications automatiques
- Gestion des disponibilités

### Documents
- Upload sécurisé (PDF, DOC, DOCX, max 2Mo)
- Prévisualisation PDF intégrée
- Association aux candidatures
- Validation côté client et serveur

## 🛠️ Technologies Utilisées

- **React 18** - Framework JavaScript moderne
- **Vite** - Build tool ultra-rapide
- **TailwindCSS** - Framework CSS utilitaire
- **React Router DOM** - Navigation côté client
- **Axios** - Client HTTP avec intercepteurs
- **React Hot Toast** - Notifications élégantes
- **Lucide React** - Icônes modernes

## 📦 Installation

\`\`\`bash
# Cloner le repository
git clone [url-du-repo]
cd recrutapp-frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
\`\`\`

## ⚙️ Configuration

### Variables d'environnement
Créer un fichier `.env` à la racine :

\`\`\`env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
\`\`\`

### Backend Laravel
S'assurer que le backend Laravel est configuré avec :
- CORS activé pour le frontend
- Endpoints API correspondants
- Authentification JWT/Sanctum

## 🏗️ Structure du Projet

\`\`\`
src/
├── api/                 # Configuration Axios et endpoints
├── components/          # Composants réutilisables
│   ├── Button.jsx
│   ├── FormInput.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── ...
├── hooks/              # Hooks personnalisés
├── pages/              # Pages de l'application
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── ...
└── main.jsx           # Point d'entrée
\`\`\`

## 🎨 Design System

### Couleurs
- **Primaire** : Bleu (#2563eb)
- **Succès** : Vert (#10b981)
- **Danger** : Rouge (#ef4444)
- **Neutre** : Gris (#6b7280)

### Composants
- Formulaires avec validation temps réel
- Boutons avec états de chargement
- Modales responsives
- Notifications toast personnalisées

## 🔒 Sécurité

- Validation côté client ET serveur
- Protection CSRF
- Sanitisation des entrées
- Gestion sécurisée des tokens
- Routes protégées par rôle

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints TailwindCSS
- Navigation adaptative
- Composants flexibles

## 🧪 Validation des Formulaires

### Côté Client
- Validation en temps réel
- Messages d'erreur contextuels
- Indicateurs visuels
- Prévention de soumission invalide

### Côté Serveur
- Validation Laravel
- Gestion des erreurs 422
- Messages d'erreur localisés

## 🚀 Déploiement

\`\`\`bash
# Build de production
npm run build

# Prévisualisation du build
npm run preview
\`\`\`

## 📋 Endpoints API Utilisés

\`\`\`javascript
// Authentification
POST /auth/login
POST /auth/register
POST /auth/logout
GET  /auth/me

// Offres d'emploi
GET    /job-offers
POST   /job-offers
PUT    /job-offers/{id}
DELETE /job-offers/{id}

// Candidatures
GET    /applications
POST   /applications
PATCH  /applications/{id}/status

// Entretiens
GET    /interviews
POST   /interviews
PUT    /interviews/{id}
DELETE /interviews/{id}

// Documents
GET    /documents
POST   /documents
GET    /documents/{id}/download
DELETE /documents/{id}

// Statistiques
GET /dashboard/stats
\`\`\`

## 👥 Rôles et Permissions

### Administrateur
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs
- Statistiques globales

### Recruteur
- Gestion de ses offres d'emploi
- Consultation des candidatures reçues
- Planification d'entretiens
- Accès aux documents des candidats

### Candidat
- Consultation des offres disponibles
- Candidature aux offres
- Suivi de ses candidatures
- Gestion de ses documents
- Consultation de ses entretiens

## 🐛 Gestion d'Erreurs

- Intercepteurs Axios globaux
- Messages d'erreur localisés
- Fallbacks d'interface
- Logging côté client
- Page 404 personnalisée

## 📈 Performance

- Lazy loading des composants
- Optimisation des images
- Mise en cache intelligente
- Bundle splitting automatique
- Compression des assets

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Email : support@recrutapp.com
- Documentation : [lien-vers-docs]
- Issues GitHub : [lien-vers-issues]
