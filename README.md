# Portfolio Manager

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Petite application simple de gestion de compétences et projets, j'ai repris ça d'un prototype de portfolio que j'ai fait il y a un petit moment déjà. J'essaie de trouver un moyen de faire une sorte d'espace admin pour mes projets et mes compétences.

## 🌟 Fonctionnalités

### Gestion des Projets
- ✨ Création et édition de projets avec titre, description et technologies
- 🎯 Points clés personnalisables pour chaque projet
- 🏷️ Tags de technologies avec animations
- 📊 Interface moderne et responsive

### Gestion des Compétences
- 📈 Barre de progression animée pour le niveau de maîtrise
- 🎨 Catégorisation avec code couleur (Frontend, Backend, Database, etc.)
- 🔄 Mise à jour en temps réel
- 📱 Design adaptatif

### Interface Utilisateur
- 🔍 Recherche globale dans les projets et compétences
- 🏷️ Filtrage par catégorie de compétences
- ✨ Animations fluides avec Framer Motion
- 🌙 Design moderne avec Tailwind CSS

## 🚀 Technologies Utilisées

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### DevOps
- Docker
- Docker Compose
- Hot Reload en développement

## 📦 Prérequis
- Docker
- Docker Compose
- Node.js (optionnel, pour le développement local)

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone https://github.com/Nelo0o/docker-compose-tp
cd docker-compose-tp
```

2. Lancez l'application avec Docker Compose :
```bash
docker-compose up --build
```

L'application sera disponible sur :
- Frontend : http://localhost:3000
- Backend : http://localhost:5000
- MongoDB Express (interface admin) : http://localhost:8081
  - Identifiant : admin
  - Mot de passe : admin123

## 💻 Développement

### Structure du Projet
```
portfolio-manager/
├── frontend/              # Application React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── App.js         # Composant principal
│   │   └── index.js       # Point d'entrée
│   ├── Dockerfile         # Configuration Docker frontend
│   └── package.json       # Dépendances frontend
├── backend/               # Serveur Node.js
│   ├── models/            # Modèles Mongoose
│   ├── routes/            # Routes API
│   ├── Dockerfile         # Configuration Docker backend
│   └── package.json       # Dépendances backend
└── docker-compose.yml     # Configuration Docker Compose
```
### Hot Reload
Le hot reload est implémenté grâce aux volumes Docker, permettant une synchronisation en temps réel entre votre machine locale et les conteneurs :
```yaml
volumes:
  - ./frontend:/app    # Synchronise le code frontend
  - ./backend:/app     # Synchronise le code backend
```
- Les modifications du code source sont automatiquement détectées grâce au montage des volumes
- Le frontend utilise le hot reload natif de React avec les variables d'environnement `WATCHPACK_POLLING` et `CHOKIDAR_USEPOLLING`
- Le backend utilise nodemon qui redémarre automatiquement lors des changements de fichiers

### Configuration

#### Variables d'Environnement
Frontend :
- `REACT_APP_API_URL` : URL de l'API backend

Backend :
- `MONGODB_URI` : URI de connexion MongoDB
- `PORT` : Port du serveur (défaut: 5000)

### API Documentation

#### Projets
- `GET /api/projects` : Liste tous les projets
- `POST /api/projects` : Crée un nouveau projet
- `PUT /api/projects/:id` : Met à jour un projet
- `DELETE /api/projects/:id` : Supprime un projet

#### Compétences
- `GET /api/skills` : Liste toutes les compétences
- `POST /api/skills` : Crée une nouvelle compétence
- `PUT /api/skills/:id` : Met à jour une compétence
- `DELETE /api/skills/:id` : Supprime une compétence

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Léon - Nelo** - *Développeur Principal* - [GitHub](https://github.com/Nelo0o)
