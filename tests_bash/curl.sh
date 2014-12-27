#This file is part of ParkingVQApi.

#ParkingVQApi is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.

#ParkingVQApi is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.

#You should have received a copy of the GNU General Public License
#along with ParkingVQApi.  If not, see <http://www.gnu.org/licenses/>.

# Commandes curls pour tester certaines partie de l'api.

# Location vide
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/-1/-1/-1/-1

# Radius vide
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/10/-1/-1

# Radius réel
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/1000/46.71585637622432/-71.38057708740234

# Location de la ville de qc :
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:4711/api/parking/46.71585637622432/-71.38057708740234/46.824965835361034/-71.27071380615234
