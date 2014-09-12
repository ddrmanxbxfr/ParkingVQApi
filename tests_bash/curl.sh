# Commandes curls pour tester certaines partie de l'api.

# Location vide
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/-1/-1/-1/-1

# Radius vide
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/10/-1/-1

# Radius réel
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/1000/46.71585637622432/-71.38057708740234

# Location de la ville de qc :
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/46.71585637622432/-71.38057708740234/46.824965835361034/-71.27071380615234
