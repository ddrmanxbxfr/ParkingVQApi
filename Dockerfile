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
