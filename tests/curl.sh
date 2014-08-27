# Commandes curls pour tester certaines partie de l'api.

# Location vide
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/-1/-1/-1/-1

# Radius vide
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/10/-1/-1