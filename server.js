// Module dependencies.

// Modules locaux
var geojson = require('./lib/geojson.js');

var application_root = __dirname,
    express = require('express'); //Web framework

var nano = require('nano')('http://localhost:5984');
var dbGeo_name = "apes_iwashere";
var dbGeo = nano.use(dbGeo_name)


// Parametres BD
var per_page = 10,
    params = {
        include_docs: true,
        limit: per_page,
        descending: true
    };


//Create server
var app = express();

// Configure server
app.configure(function () {
    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());

    //perform route lookup based on url and HTTP method
    app.use(app.router);

    //Show all errors in development
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

function outCorsHeader(request, response) {
    response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
}

function arrondirWpy(roundloc, docToWorkOn) {
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
 * @api {get} /api/parking/:id/:radius/:lat/:lng Obtenir les document selon le périmètre
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
app.get('/api/parking/:id/:radius/:lat/:lng', function (request, response) {
    outCorsHeader(request, response);

    dbGeo.view('nodejs', 'keys', {
        include_docs: true,
        reduce: false,
        key: request.params.id
    }, function (err, doc) {
        var documentToSend;
        if (!err) {

            var documentToWorkOn = geojson.preparerDocumentFeaturesFromCouchView(doc, request.params.id);
            documentToSend = "We worked on it at least";
            if (geojson.evaluerSiTypePoint(documentToWorkOn))
            // "this is really a point document"
                documentToSend = arrondirWpy(request.query.roundloc, geojson.generateGeoJsonDocRadius(documentToWorkOn, request.params.radius, request.params.lat, request.params.lng));
            else
                documentToSend = "This is not a point document. Can't do anything";
        } else {
            documentToSend = 'could not find id!!';
        }

        response.send(documentToSend);
    });
});


/**
 * @api {get} /api/parking/:id/:latSW/:lngSW/:latNE/:lngNE Obtenir les document selon les bounds fournis.
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
app.get('/api/parking/:id/:latSW/:lngSW/:latNE/:lngNE', function (request, response) {
    outCorsHeader(request, response);

    dbGeo.view('datasets', request.params.id, {
        include_docs: true,
        reduce: false
    }, function (err, doc) {
        var documentToSend;
        if (!err) {

            var documentToWorkOn = geojson.preparerDocumentFeaturesFromCouchView(doc, request.params.id);
            documentToSend = "We worked on it at least";
            if (geojson.evaluerSiTypePoint(documentToWorkOn) ||  geojson.evaluerSiTypePolygon(documentToWorkOn))
            // "this is really a point document"
                documentToSend = arrondirWpy(request.query.roundloc, geojson.generateGeoJsonDocBounds(documentToWorkOn, request.params.latSW, request.params.lngSW, request.params.latNE, request.params.lngNE));
            else
                documentToSend = "This is not a point document. Can't do anything";
        } else {
            documentToSend = 'could not find id!!';
        }

        response.send(documentToSend);
    });
});


//Start server
var port = 4711;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});