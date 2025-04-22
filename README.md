# Pokedex

Application web permettant de consulter et rechercher des Pokémon par type ou par nom.

---

## Description

Pokedex est une application web composée d’un backend Node.js faisant office d’API, et d’un frontend HTML/CSS/JavaScript. Elle permet aux utilisateurs d'accéder facilement aux informations des Pokémon selon leurs recherches.

Le projet utilise **Docker** pour simplifier le déploiement.

---

## Fonctionnalités principales

- Recherche de Pokémon par **nom**
- Filtrage par **type**
- Consultation de la fiche détaillée d’un Pokémon

---

## Technologies utilisées

- **Backend :** Node.js (JavaScript)
- **Frontend :** HTML, CSS, JavaScript
- **Conteneurisation :** Docker

---

### Prérequis

- Node.js installé localement
- Docker installé (optionnel mais recommandé)


#### Installation classique

```bash
# 1. Cloner le projet
git clone https://github.com/justlsia/pokedex.git
cd pokedex

# 2. Installer les dépendances du backend
cd backend
npm install

# 3. Lancer le serveur backend
node index.js

# 4. Ouvrir le frontend
# Depuis le dossier frontend, ouvrir index.html dans votre navigateur

# Ou, depuis la racine du projet
docker compose up --build
```

---

### Captures d'écran :
- Accueil

- Fiche d'un Pokémon
