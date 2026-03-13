# PharmaManager
Application de gestion de pharmacie — Développé dans le cadre du test technique SMARTHOLOL

---

## Stack Technique
- **Backend** : Django + Django REST Framework + PostgreSQL  
- **Frontend** : React.js (Vite)  
- **Documentation API** : Swagger (drf-spectacular)

---

## Installation Backend

```bash
git clone https://github.com/ikram-lb/pharma-manager.git
cd pharma-manager/backend

python -m venv venv

# Activer l'environnement virtuel
# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate

pip install -r requirements.txt

# Copier les variables d'environnement
cp .env.example .env

# Appliquer les migrations
python manage.py migrate

# Charger les données de test (optionnel)
python manage.py loaddata fixtures/initial_data.json

# Lancer le serveur
python manage.py runserver

Backend disponible sur :

http://localhost:8000

Installation Frontend
cd ../frontend

npm install

# Copier les variables d'environnement
cp .env.example .env

# Lancer le serveur de développement
npm run dev

## Frontend disponible sur :

http://localhost:5173


Documentation API

# Swagger UI disponible sur :

http://localhost:8000/api/schema/swagger-ui/
