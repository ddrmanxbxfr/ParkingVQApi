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

# Benchmark de radius
siege -q -c10 -d10 -t60S http://127.0.0.1:4711/api/parking/10/46.71585637622432/-71.38057708740234

# Benchmark de bounds
siege -q -c15 -d10 -t60S http://127.0.0.1:4711/api/parking/46.71585637622432/-71.38057708740234/46.824965835361034/-71.27071380615234?roundloc=4

siege -q -c15 -d10 -t60S http://127.0.0.1:4711/api/redis_couch/46.71585637622432/-71.38057708740234/46.824965835361034/-71.27071380615234?roundloc=4
