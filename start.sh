#!/bin/bash
echo "Démarage de l'image docker"
docker run -d -p 4711:4711 apes/api
