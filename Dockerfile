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

# DOCKER-VERSION 1.1.2
FROM ubuntu:14.04.1

# Update de apt get
RUN apt-get update
RUN apt-get -y upgrade

# Installer nodejs et npm
RUN apt-get -y install nodejs
RUN apt-get -y install npm

# Copier les fichiers du projets
COPY . /src
# Installer les deps de nodejs
RUN cd /src; npm install

# Port de dev
EXPOSE 4711

# Démarer le service
CMD ["nodejs", "/src/server.js"]
