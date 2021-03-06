/*
This file is part of ParkingVQApi.

ParkingVQApi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

ParkingVQApi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with ParkingVQApi.  If not, see <http://www.gnu.org/licenses/>.
*/

// Module dependencies.

// Modules locaux
var geojson = require('./lib/geojson.js');

var application_root = __dirname,
    express = require('express'); //Web framework

var nano = require('nano')('http://localhost:5984');
var dbGeo_name = "parking_api";
var dbGeo = nano.use(dbGeo_name)
var documentToWorkOnMemory, isDocumentLoaded;


var rjson = require('rjson');

var redis = require('redis');
var client = redis.createClient();
var proximity = require('geo-proximity').initialize(client, "geo:parking_api");
var redisDocsParsedByCouchId;

//Create server
var app = express();

// Configure server
app.configure(function () {
    "use strict";

    // Compress if we can !
    app.use(express.compress());

    // JSON :)
    app.use(express.json());

    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());

    //perform route lookup based on url and HTTP method
    app.use(app.router);



    // Set json spaces at 0 !
    app.set('json spaces', 0);

    //Show all errors in development
    /*app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    })); */
});

function outCorsHeader(request, response) {
    response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
}

function arrondirWpy(roundloc, docToWorkOn) {
    "use strict";
    var documentResult;
    if (roundloc != null) {
        var numToGo = parseInt(roundloc);
        documentResult = geojson.retirerWaypointTropProche(docToWorkOn, roundloc);
    } else
        documentResult = docToWorkOn;
    return documentResult;
}

//Router
/**
 * @api {get} /api/parking/:radius/:lat/:lng Obtenir les document selon le périmètre
 * @apiName GetParkingDetailRadius
 * @apiGroup Parking
 *
 * @apiParam {String} id Nom du jeu de donnée.
 * @apiParam {Number} radius Périmètre des points désirés.
 * @apiParam {Number} lat Point de latitude source.
 * @apiParam {Number} lng Point de longitude source.
 * @apiParam {Integer} [?roundloc=] Arrondir les waypoints au nombre spécifié.
 *
 * @apiSuccess {GeoJson} documentFeatures Document formatté avec la liste de waypoints selon le radius.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "_id": "b6191e110019328d4c8b2bedff000a7a",
 *   "_rev": "1-aabffa12807d084ccbcd63f7c51b0533",
 *   "name": "PARCOMETRE",
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [
 *           -71.2217178685479,
 *           46.803835920695
 *         ]
 *       },
 *       "properties": {
 *         "ID": "300070"
 *       }
 *     }
 * 	]
 * }
 *
 */
app.get('/api/parking/:radius/:lat/:lng', function (request, response) {
    outCorsHeader(request, response);
    documentToSend = {
        "status": "WorkedOnItButFailed"
    };
    if (isDocumentLoaded && geojson.evaluerSiTypePoint(documentToWorkOnMemory))
    // "this is really a point document"
        documentToSend = arrondirWpy(request.query.roundloc, geojson.generateGeoJsonDocRadius(documentToWorkOnMemory, request.params.radius, request.params.lat, request.params.lng));
    else
        documentToSend = '{"status": "NotAPointDocument"}';

    response.json(rjson.pack(documentToSend));
});


/**
 * @api {get} /api/parking/:latSW/:lngSW/:latNE/:lngNE Obtenir les document selon les bounds fournis.
 * @apiName GetParkingDetailBounds
 * @apiGroup Parking
 *
 * @apiDescription Les document à été calculés à partir des bounds à condition que le jeu de données soit fournit en format points.
 *
 * @apiParam {String} id Nom du jeu de donnée.
 * @apiParam {Number} latSW Point de latitude South West.
 * @apiParam {Number} lngSW Point de longitude South West.
 * @apiParam {Number} latNE Point de latitude Nord East.
 * @apiParam {Number} lngNE Point de longitude Nord East.
 * @apiParam {Integer} [?roundloc=] Arrondir les waypoints au nombre spécifié.
 *
 * @apiSuccess {GeoJson} documentFeatures Document formatté avec la liste de waypoints selon le périmètre.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "_id": "b6191e110019328d4c8b2bedff000a7a",
 *   "_rev": "1-aabffa12807d084ccbcd63f7c51b0533",
 *   "name": "PARCOMETRE",
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [
 *           -71.2217178685479,
 *           46.803835920695
 *         ]
 *       },
 *       "properties": {
 *         "ID": "300070"
 *       }
 *     }
 * 	]
 * }
 *
 */
app.get('/api/parking/:latSW/:lngSW/:latNE/:lngNE', function (request, response) {
    outCorsHeader(request, response);
    var documentToSend;
    documentToSend = {
        "status": "WorkedOnItButFailed"
    };
    if (isDocumentLoaded && geojson.evaluerSiTypePoint(documentToWorkOnMemory) || geojson.evaluerSiTypePolygon(documentToWorkOnMemory)) {
        documentToSend = arrondirWpy(request.query.roundloc, geojson.generateGeoJsonDocBounds(documentToWorkOnMemory, request.params.latSW, request.params.lngSW, request.params.latNE, request.params.lngNE));

    }
    response.json(rjson.pack(documentToSend));
});

app.get('/api/redis_couch/:latSW/:lngSW/:latNE/:lngNE', function (request, response) {
    outCorsHeader(request, response);
    var documentToSend;
    documentToSend = {
        "status": "WorkedOnItButFailed"
    };

    documentToSend = geojson.computeBoundsFromGeoHashAndRedis(rjson, redisDocsParsedByCouchId, response, dbGeo, proximity, request.query.roundloc, request.params.latSW, request.params.lngSW, request.params.latNE, request.params.lngNE);
});

/**
 * @api {get} /api/parking/:latSW/:lngSW/:latNE/:lngNE/:dLatSW/:dLngSW/:dLatNE/:dLngNE Obtenir les document selon les bounds fournis.
 * @apiName GetParkingDetailBoundsDelta
 * @apiGroup Parking
 *
 * @apiDescription Les document à été calculés à partir d'un delta de bounds à condition que le jeu de données soit fournit en format points.
 *
 * @apiParam {String} id Nom du jeu de donnée.
 * @apiParam {Number} latSW Point de latitude South West.
 * @apiParam {Number} lngSW Point de longitude South West.
 * @apiParam {Number} latNE Point de latitude Nord East.
 * @apiParam {Number} lngNE Point de longitude Nord East.
 * @apiParam {Number} dLatSW Deuxieme point de latitude South West.
 * @apiParam {Number} dLngSW Deuxieme point de longitude South West.
 * @apiParam {Number} dLatNE Deuxieme point de latitude Nord East.
 * @apiParam {Number} dLngNE Deuxieme point de longitude Nord East.
 * @apiParam {Integer} [?roundloc=] Arrondir les waypoints au nombre spécifié.
 *
 * @apiSuccess {GeoJson} documentFeatures Document formatté avec la liste de waypoints selon le périmètre.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "_id": "b6191e110019328d4c8b2bedff000a7a",
 *   "_rev": "1-aabffa12807d084ccbcd63f7c51b0533",
 *   "name": "PARCOMETRE",
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [
 *           -71.2217178685479,
 *           46.803835920695
 *         ]
 *       },
 *       "properties": {
 *         "ID": "300070"
 *       }
 *     }
 * 	]
 * }
 *
 */
app.get('/api/parking/:latSW/:lngSW/:latNE/:lngNE/:dLatSW/:dLngSW/:dLatNE/:dLngNE', function (request, response) {
    outCorsHeader(request, response);
    var documentToSend, boundsToCompute;
    documentToSend = {
        "status": "WorkedOnItButFailed"
    };
    if (isDocumentLoaded && geojson.evaluerSiTypePoint(documentToWorkOnMemory)) {
        documentToSend = arrondirWpy(request.query.roundloc, geojson.generateGeoJsonDocBoundsDelta(documentToWorkOnMemory, request.params.latSW, request.params.lngSW, request.params.latNE, request.params.lngNE, request.params.dLatSW, request.params.dLngSW, request.params.dLatNE, request.params.dLngNE));
    }

    response.json(rjson.pack(documentToSend));
});


function loadWaypointInMemory() {
    dbGeo.view('nodejs', 'keys', {
        include_docs: true,
        reduce: false
    }, function (err, doc) {
        var documentToSend, redisGeoHashLocs;
        if (!err) {
            // console.log('Starting dataload for redis client GeoHash service');
            redisGeoHashLocs = geojson.preparerRedisPourGeohash(doc);
            geojson.preparerAssociativeArrayPourRedis(doc, client, redis);
            proximity.addCoordinates(redisGeoHashLocs, function (err, reply) {
                if (err) console.error(err);
                console.log("REDIS GeoHash ADD successful:", reply)
            });

            documentToWorkOnMemory = geojson.preparerDocumentFeaturesFromCouchView(doc);
            console.log('Nb occurence dataset : ' + documentToWorkOnMemory.features.length);
            console.log('Finished loading waypoints in memory');
            isDocumentLoaded = true;

        } else {}
    });
}


//Start server
var port = 4711;
app.listen(port, function () {
    "use strict";
    isDocumentLoaded = false;
    loadWaypointInMemory();
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
