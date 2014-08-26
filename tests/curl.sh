# Commandes curls pour tester certaines partie de l'api.

# Partie bon citoyen invalide
curl -X POST -H "Content-Type: application/json" -d '{"username":"xyz","password":"xyz"}' http://127.0.0.1:4711/api/boncitoyen

# Update status
curl -X POST -H "Content-Type: application/json" -d '{"status": 0}' http://127.0.0.1:4711/api/boncitoyen/generated317/status

# Test Authentication
curl -X POST -H "Content-Type: application/json" -d '{"login": "toto", "password": "toto"}' http://127.0.0.1:4711/api/authentication/login

#Ajout d'un user...
curl -X POST -H "Content-Type: application/json" -d '{"username": "toto", "password": "toto", "email": "yolo@moo.com"}' http://127.0.0.1:4711/api/authentication/register

# Partie bon citoyen valide.
curl -X POST -H "Content-Type: application/json" -d '{"titre":"Jai marre de quebec","type": "ville_fontaines","description":"les bornes fontaines sont trop moches.", "lat" : "0.22222", "lng": "0.33333"}' http://127.0.0.1:4711/api/boncitoyen
