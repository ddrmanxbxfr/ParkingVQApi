define({ api: [
  {
    "type": "post",
    "url": "/api/authentication/login",
    "title": " Login.",
    "name": "PostLogin",
    "group": "Authentication",
    "description": "<p>Permet d&#39;obtenir un token JWT pour utiliser les services privés de l&#39;api...</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "Username",
            "optional": false,
            "description": "<p>Nom d&#39;utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "Password",
            "optional": false,
            "description": "<p>Mot de passe de l&#39;utilisateur.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "field": "tokenjson",
            "optional": false,
            "description": "<p>Json contenant le token JWT de l&#39;utilisateur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n\"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRvdG8ifQ.F_zoMFWttE1T1GVfQqxktRHxepPYe5v2Oi4Hc6s7u74\"\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "post",
    "url": "/api/authentication/register",
    "title": " Register.",
    "name": "PostRegister",
    "group": "Authentication",
    "description": "<p>Permet d&#39;ajouter un utilisateur et d&#39;obtenir une confirmation...</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "Username",
            "optional": false,
            "description": "<p>Nom d&#39;utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "Password",
            "optional": false,
            "description": "<p>Mot de passe de l&#39;utilisateur.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "field": "valJson",
            "optional": false,
            "description": "<p>Json qui valide l&#39;inscription au service.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n\"result\": \"RegisterSuccess\"\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/boncitoyen",
    "title": "Liste des plaintes.",
    "name": "GetBonCitoyen",
    "group": "BonCitoyen",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "<p>Clé du document de plainte.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"name\": \"PlainteFeuVQ23\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/boncitoyen/:id",
    "title": "Obtenir un incident",
    "name": "GetBonCitoyenDetail",
    "group": "BonCitoyen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>Clé du document de plainte.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "field": "document",
            "optional": false,
            "description": "<p>Document de la plainte.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n\"_id\": \"450a953e7f682c8bc8c6f3909f0006b3\",\n\"_rev\": \"2-61ceeafbac1203dc44e822171b5a2083\",\n\"titre\": \"generated317\",\n\"type\": \"Debris voiture\",\n\"lat\": \"46.10989756847276\",\n\"lng\": \"-64.6160888671875\",\n\"description\": \"Il y a une plume de oiseau dans la rue.\",\n\"status\": 2\n}\n"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"status\": \"fetch error\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/boncitoyen/:latSW/:lngSW/:latNE/:lngNE",
    "title": " Document GeoJson selon les lat-lng bounds.",
    "name": "GetBonCitoyenDetailBounds",
    "group": "BonCitoyen",
    "description": "<p>Le document GeoJson des plaintes boncitoyen à été calculés à partir des bounds fournit.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "latSW",
            "optional": false,
            "description": "<p>Point de latitude South West.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "lngSW",
            "optional": false,
            "description": "<p>Point de longitude South West.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "latNE",
            "optional": false,
            "description": "<p>Point de latitude Nord East.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "lngNE",
            "optional": false,
            "description": "<p>Point de longitude Nord East.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "GeoJson",
            "field": "documentFeatures",
            "optional": false,
            "description": "<p>Document formatté avec la liste de waypoints selon le périmètre.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n\"name\": \"BONCITOYEN\",\n\"type\": \"FeatureCollection\",\n\"features\": [\n  {\n    \"type\": \"Feature\",\n    \"geometry\": {\n      \"type\": \"Point\",\n      \"coordinates\": [\n        \"-64.63651657104492\",\n        \"46.12405781339444\"\n      ]\n    },\n    \"properties\": {\n    \"TITRE\": \"generated303\",\n    \"TYPE\": \"Debris voiture\",\n    \"DESCRIPTION\": \"Il y a une plume de oiseau dans la rue.\",\n    \"STATUS\": 1\n }\n }\n]\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/boncitoyen/:id/status",
    "title": "Obtenir status d'un incident",
    "name": "GetBonCitoyenDetailStatus",
    "group": "BonCitoyen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>Clé du document de plainte.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "field": "document",
            "optional": false,
            "description": "<p>Status de la plainte.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"status\": 2\n}\n"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"status\": \"fetch error\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "post",
    "url": "/api/boncitoyen/:id/status",
    "title": "Mettre à jour status d'un incident",
    "name": "PostBonCitoyenDetailStatus",
    "group": "BonCitoyen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>Clé du document de plainte.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "PutData",
            "optional": false,
            "description": "<p>Json avec attribut Status désiré.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "field": "document",
            "optional": false,
            "description": "<p>Confirmation d&#39;ecriture de la plainte.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"status\": \"Update done\"\n}\n"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response lors du fetch:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"status\": \"fetch error\"\n   }\n"
        },
        {
          "title": "Error-Response lors du insert:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"status\": \"fetch error\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "post",
    "url": "/api/boncitoyen",
    "title": "Insérer une plainte",
    "name": "PostBonCityon",
    "group": "BonCitoyen",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "Status",
            "optional": false,
            "description": "<p>Confirmation d&#39;écriture à la BD.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"status\": \"Insert done\"}\n"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n   {\n     \"status\": \"Invalid object\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/geojson",
    "title": "Liste des sources de données GeoJson",
    "name": "GetGeoJson",
    "group": "GeoJson",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "<p>Clé du document GeoJson.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"name\": \"PARCOMETRE\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/geojson/:id",
    "title": "Obtenir le document GeoJson",
    "name": "GetGeoJsonDetail",
    "group": "GeoJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>Nom du jeu de donnée GeoJson.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "?roundloc",
            "defaultValue": "",
            "optional": true,
            "description": "<p>Arrondir les waypoints au nombre spécifié.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "GeoJson",
            "field": "documentFeatures",
            "optional": false,
            "description": "<p>Document formatté avec la liste de waypoints.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"_id\": \"b6191e110019328d4c8b2bedff000a7a\",\n \"_rev\": \"1-aabffa12807d084ccbcd63f7c51b0533\",\n \"name\": \"PARCOMETRE\",\n \"type\": \"FeatureCollection\",\n \"features\": [\n   {\n     \"type\": \"Feature\",\n     \"geometry\": {\n       \"type\": \"Point\",\n       \"coordinates\": [\n         -71.2217178685479,\n         46.803835920695\n       ]\n     },\n     \"properties\": {\n       \"ID\": \"300070\",\n       \"COTE_RUE\": \"Ouest\",\n       \"LECT_MET\": \"208\",\n       \"SEGMENT_RU\": \"105\",\n       \"DIRECTION\": null,\n       \"NOM_TOPOG\": \"Avenue Louis-St-Laurent\",\n       \"NO_BORNE\": \"2371\",\n       \"NO_CIVIQ\": null,\n       \"ID_VOIE_PUB\": 105663,\n       \"GEOM\": \"POINT (249714.049 5185174.046)\"\n     }\n   }\n]\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/geojson/:id/:latSW/:lngSW/:latNE/:lngNE",
    "title": "Obtenir le document GeoJson selon les bounds fournis.",
    "name": "GetGeoJsonDetailBounds",
    "group": "GeoJson",
    "description": "<p>Le document GeoJson à été calculés à partir des bounds à condition que le jeu de données soit fournit en format points.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>Nom du jeu de donnée GeoJson.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "latSW",
            "optional": false,
            "description": "<p>Point de latitude South West.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "lngSW",
            "optional": false,
            "description": "<p>Point de longitude South West.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "latNE",
            "optional": false,
            "description": "<p>Point de latitude Nord East.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "lngNE",
            "optional": false,
            "description": "<p>Point de longitude Nord East.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "?roundloc",
            "defaultValue": "",
            "optional": true,
            "description": "<p>Arrondir les waypoints au nombre spécifié.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "GeoJson",
            "field": "documentFeatures",
            "optional": false,
            "description": "<p>Document formatté avec la liste de waypoints selon le périmètre.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"_id\": \"b6191e110019328d4c8b2bedff000a7a\",\n \"_rev\": \"1-aabffa12807d084ccbcd63f7c51b0533\",\n \"name\": \"PARCOMETRE\",\n \"type\": \"FeatureCollection\",\n \"features\": [\n   {\n     \"type\": \"Feature\",\n     \"geometry\": {\n       \"type\": \"Point\",\n       \"coordinates\": [\n         -71.2217178685479,\n         46.803835920695\n       ]\n     },\n     \"properties\": {\n       \"ID\": \"300070\",\n       \"COTE_RUE\": \"Ouest\",\n       \"LECT_MET\": \"208\",\n       \"SEGMENT_RU\": \"105\",\n       \"DIRECTION\": null,\n       \"NOM_TOPOG\": \"Avenue Louis-St-Laurent\",\n       \"NO_BORNE\": \"2371\",\n       \"NO_CIVIQ\": null,\n       \"ID_VOIE_PUB\": 105663,\n       \"GEOM\": \"POINT (249714.049 5185174.046)\"\n     }\n   }\n]\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "get",
    "url": "/api/geojson/:id/:radius/:lat/:lng",
    "title": "Obtenir le document GeoJson selon le périmètre",
    "name": "GetGeoJsonDetailRadius",
    "group": "GeoJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>Nom du jeu de donnée GeoJson.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "radius",
            "optional": false,
            "description": "<p>Périmètre des points désirés.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "lat",
            "optional": false,
            "description": "<p>Point de latitude source.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "lng",
            "optional": false,
            "description": "<p>Point de longitude source.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "?roundloc",
            "defaultValue": "",
            "optional": true,
            "description": "<p>Arrondir les waypoints au nombre spécifié.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "GeoJson",
            "field": "documentFeatures",
            "optional": false,
            "description": "<p>Document formatté avec la liste de waypoints selon le radius.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"_id\": \"b6191e110019328d4c8b2bedff000a7a\",\n \"_rev\": \"1-aabffa12807d084ccbcd63f7c51b0533\",\n \"name\": \"PARCOMETRE\",\n \"type\": \"FeatureCollection\",\n \"features\": [\n   {\n     \"type\": \"Feature\",\n     \"geometry\": {\n       \"type\": \"Point\",\n       \"coordinates\": [\n         -71.2217178685479,\n         46.803835920695\n       ]\n     },\n     \"properties\": {\n       \"ID\": \"300070\",\n       \"COTE_RUE\": \"Ouest\",\n       \"LECT_MET\": \"208\",\n       \"SEGMENT_RU\": \"105\",\n       \"DIRECTION\": null,\n       \"NOM_TOPOG\": \"Avenue Louis-St-Laurent\",\n       \"NO_BORNE\": \"2371\",\n       \"NO_CIVIQ\": null,\n       \"ID_VOIE_PUB\": 105663,\n       \"GEOM\": \"POINT (249714.049 5185174.046)\"\n     }\n   }\n]\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "application.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/application.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "basicAuth.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/basicAuth.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "bodyParser.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/bodyParser.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "browser.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/browser.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "browser.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/browser.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "browser.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/browser.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "browser.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/browser.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "build.js",
    "version": "0.0.0",
    "filename": "./node_modules/faye/node_modules/concat-stream/node_modules/readable-stream/node_modules/isarray/build/build.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "build.js",
    "version": "0.0.0",
    "filename": "./node_modules/faye/node_modules/concat-stream/node_modules/readable-stream/node_modules/isarray/build/build.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "build.js",
    "version": "0.0.0",
    "filename": "./node_modules/faye/node_modules/concat-stream/node_modules/readable-stream/node_modules/isarray/build/build.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "build.js",
    "version": "0.0.0",
    "filename": "./node_modules/faye/node_modules/concat-stream/node_modules/readable-stream/node_modules/isarray/build/build.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "build.js",
    "version": "0.0.0",
    "filename": "./node_modules/faye/node_modules/concat-stream/node_modules/readable-stream/node_modules/isarray/build/build.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "build.js",
    "version": "0.0.0",
    "filename": "./node_modules/faye/node_modules/concat-stream/node_modules/readable-stream/node_modules/isarray/build/build.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/cache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/cache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/cache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/cache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/cache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "commander.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/commander/lib/commander.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "compress.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/compress.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "connect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/connect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "cookie.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/cookie.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "cookieParser.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/cookieParser.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "cookieSession.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/cookieSession.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "csrf.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/csrf.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "csrf.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/csrf.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/lib/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/lib/debug.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/debug.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "debug.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/debug/lib/debug.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "directory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/directory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "directory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/directory.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "directory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/directory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "errorHandler.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/errorHandler.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "expect.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/expect.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "express.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/express.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "favicon.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/favicon.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/cookie-signature/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/cookie-signature/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/bytes/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/bytes/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/range-parser/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/fresh/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/node_modules/ms/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/node_modules/ms/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/node_modules/ms/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/node_modules/ms/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/request/node_modules/aws-sign2/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/nano/node_modules/follow/node_modules/request/node_modules/qs/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/index.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "index.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/index.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "json.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/json.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "jwt.js",
    "version": "0.0.0",
    "filename": "./node_modules/jwt-simple/lib/jwt.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "jwt.js",
    "version": "0.0.0",
    "filename": "./node_modules/jwt-simple/lib/jwt.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "limit.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/limit.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "logger.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/logger.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "logger.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/logger.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "logger.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/logger.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "logger.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/logger.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "memory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/memory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "memory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/memory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "memory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/memory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "memory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/memory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "memory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/memory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "memory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/memory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "memory.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/memory.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "methodOverride.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/methodOverride.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "middleware.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/middleware.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public.",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "publci",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "mocha.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/mocha.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "multipart.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/multipart.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "node.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/node.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "node.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/node.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "node.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/debug/node.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "patch.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/patch.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "patch.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/patch.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "proto.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/proto.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "proto.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/proto.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "proto.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/proto.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "qs.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/test/browser/qs.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "query.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/query.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/querystring.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/querystring.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/querystring.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "querystring.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/node_modules/qs/lib/querystring.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "request.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/request.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "response.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/response.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "responseTime.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/responseTime.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "route.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/route.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "route.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/route.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "send.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/send.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/session.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/session.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/session.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/session.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/session.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/session.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "session.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/session.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "static.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/static.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "staticCache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/staticCache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "staticCache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/staticCache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "staticCache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/staticCache.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "staticCache.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/staticCache.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "store.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/store.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "store.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/store.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "store.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/store.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "store.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/session/store.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "timeout.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/timeout.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "urlencoded.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/urlencoded.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/send/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/utils.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "utils.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js"
  },
  {
    "type": "",
    "url": "public",
    "group": "vhost.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/node_modules/connect/lib/middleware/vhost.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "view.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/view.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "view.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/view.js"
  },
  {
    "type": "",
    "url": "private",
    "group": "view.js",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/view.js"
  }
] });