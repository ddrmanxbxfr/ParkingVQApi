/*jslint nomen: true */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, exports: false, process: false, require: false, setInterval: false, setTimeout: false*/
var calculs = require('./calculs.js');

// Valide que le document geojson contient des points à l'intérieur.
exports.evaluerSiTypePoint = function (documentGeoJson) {
    "use strict";
    var len, iCpt;
    if (documentGeoJson.features !== undefined) {
        len = documentGeoJson.features.length;
        for (iCpt = 0; iCpt <  len; iCpt = iCpt + 1) {
            if (documentGeoJson.features[iCpt].geometry !== undefined && documentGeoJson.features[iCpt].geometry.type !== undefined && documentGeoJson.features[iCpt].geometry.type === "Point") {
                return true;
            }
        }
    }
    return false;
};

exports.evaluerSiTypePolygon = function (documentGeoJson) {
    "use strict";
    var len, iCpt;
    if (documentGeoJson.features !== undefined) {
        len = documentGeoJson.features.length;
        for (iCpt = 0; iCpt <  len; iCpt = iCpt + 1) {
            if (documentGeoJson.features[iCpt].geometry !== undefined && documentGeoJson.features[iCpt].geometry.type !== undefined && documentGeoJson.features[iCpt].geometry.type === "Polygon") {
                return true;
            }
        }
    }
    return false;
};


// Calcul de distance.
exports.generateGeoJsonDocRadius = function (documentSrc, radiusTarget, lat, lng) {
    "use strict";
    var docReturn, iCpt;
    if (documentSrc !== undefined && documentSrc.name !== undefined && documentSrc.type !== undefined && radiusTarget !== undefined && lat !== undefined && lng !== undefined) {

        docReturn = {
            "name": documentSrc.name,
            "type": documentSrc.type,
            "features": []
        };
        if (documentSrc.features !== undefined) {
            for (iCpt = 0; iCpt <  documentSrc.features.length; iCpt = iCpt + 1) {
                if (documentSrc.features[iCpt].geometry.type === "Point") {
                    if (calculs.isPointInRadius(radiusTarget, lat, lng, documentSrc.features[iCpt].geometry.coordinates[1], documentSrc.features[iCpt].geometry.coordinates[0])) {
                        docReturn.features.push(documentSrc.features[iCpt]);
                    }
                }
            }
        }
    } else {
        docReturn = {
            "name": "ParkingAPI",
            "type": "FeatureCollection",
            "features": []
        };
    }
    return docReturn;
};

// Calcul de waypoints selon bounds.
exports.generateGeoJsonDocBounds = function (documentSrc, latSW, lngSW, latNE, lngNE) {
    "use strict";
    var docReturn, pointCalc, len, radiusTarget, iCpt;
    if (documentSrc !== undefined && documentSrc.name !== undefined && documentSrc.type !== undefined && lngSW !== undefined && latSW !== undefined && latNE !== undefined && lngNE !== undefined) {
        docReturn = {
            "name": documentSrc.name,
            "type": documentSrc.type,
            "features": []
        };
        if (documentSrc.features !== undefined) {
            // Calculer le point central
            pointCalc = calculs.calculerPointCentreRectangle(latSW, latNE, lngSW, lngNE);
            radiusTarget = calculs.calcDistance(pointCalc.lat, pointCalc.lng, latNE, lngNE);
            len = documentSrc.features.length;

            if (len >  0) { // Sanity check
                if (documentSrc.features[0].geometry.type === "Point") {
                    for (iCpt = 0; iCpt <  len; iCpt = iCpt + 1) {
                        if (calculs.isPointInRadius(radiusTarget, pointCalc.lat, pointCalc.lng, documentSrc.features[iCpt].geometry.coordinates[1], documentSrc.features[iCpt].geometry.coordinates[0])) {
                            docReturn.features.push(documentSrc.features[iCpt]);
                        }
                    }
                } else {
                    if (documentSrc.features[0].geometry.type === "Polygon") {
                        for (iCpt = 0; iCpt <  len; iCpt = iCpt + 1) {
                            // 1ère stratégie vérifier que le point est dans le polygone.
                            // 2e stratégie vérifier que le polygon est à l'intérieur de l'écran
                            if (calculs.isPointInPoly(documentSrc.features[iCpt].geometry.coordinates[0], pointCalc.lat, pointCalc.lng) || calculs.isPolyInBounds(documentSrc.features[iCpt].geometry.coordinates[0], latSW, lngSW, latNE, lngNE)) {
                                docReturn.features.push(documentSrc.features[iCpt]);
                            }
                        }
                    }
                }

            }
        }
    } else {
        docReturn = {
            "name": "ParkingAPI",
            "type": "FeatureCollection",
            "features": []
        };
    }
    return docReturn;
};

// Calcul de waypoint qui sort uniquement les waypoint du rectangle le plus gros... et non celui de l'interieur
exports.generateGeoJsonDocBoundsDelta = function (documentSrc, latSW, lngSW, latNE, lngNE, dLatSW, dLngSW, dLatNE, dLngNE) {
    "use strict";
    var docReturn, len, iCpt, dpointCalc, dradiusTarget, pointCalc, radiusTarget;
    if (documentSrc !== undefined && documentSrc.name !== undefined && documentSrc.type !== undefined && lngSW !== undefined && latSW !== undefined && latNE !== undefined && lngNE !== undefined) {
        docReturn = {
            "name": documentSrc.name,
            "type": documentSrc.type,
            "features": []
        };
        if (documentSrc.features !== undefined) {
            len = documentSrc.features.length;
            dpointCalc = calculs.calculerPointCentreRectangle(dLatSW, dLatNE, dLngSW, dLngNE);
            dradiusTarget = calculs.calcDistance(dpointCalc.lat, dpointCalc.lng, dLatNE, dLngNE);
            pointCalc = calculs.calculerPointCentreRectangle(latSW, latNE, lngSW, lngNE);
            radiusTarget = calculs.calcDistance(pointCalc.lat, pointCalc.lng, latNE, lngNE);
            if (len >  0) { // Sanity check
                if (documentSrc.features[0].geometry.type === "Point") {
                    for (iCpt = 0; iCpt <  len; iCpt = iCpt + 1) {
                        if (calculs.isPointInRadius(dradiusTarget, dpointCalc.lat, dpointCalc.lng, documentSrc.features[iCpt].geometry.coordinates[1], documentSrc.features[iCpt].geometry.coordinates[0]) && !calculs.isPointInRadius(radiusTarget, pointCalc.lat, pointCalc.lng, documentSrc.features[iCpt].geometry.coordinates[1], documentSrc.features[iCpt].geometry.coordinates[0])) {
                            docReturn.features.push(documentSrc.features[iCpt]);
                        }
                    }
                }
            }
        }
    } else {
        docReturn = {
            "name": "ParkingAPI",
            "type": "FeatureCollection",
            "features": []
        };
    }
    return docReturn;
};

// Fonction pour retirer les waypoints qui sont trop proches.
exports.retirerWaypointTropProche = function (documentSrc, nbDecimalTolere) {
    "use strict";
    var latArrondis, lngArrondis, docReturn, length, iCpt, arrVerifDecimal;
    if (documentSrc !== undefined && nbDecimalTolere !== undefined && documentSrc.features !== undefined) {
        docReturn = {
            "name": documentSrc.name,
            "type": documentSrc.type,
            "features": []
        };
        // Transverser les documents à l'intérieur des nouveaux si fit.
        // Stocker les valeurs Arrondis dans un array associatifs puis match....
        arrVerifDecimal = [];
        length = documentSrc.features.length;
        for (iCpt = 0; iCpt < length; iCpt = iCpt + 1) {
            if (documentSrc.features[iCpt].geometry !== undefined && documentSrc.features[iCpt].geometry.coordinates !== undefined && !isNaN(documentSrc.features[iCpt].geometry.coordinates[0]) && !isNaN(documentSrc.features[iCpt].geometry.coordinates[1])) {
                latArrondis = parseFloat(documentSrc.features[iCpt].geometry.coordinates[0]).toFixed(nbDecimalTolere);
                lngArrondis = parseFloat(documentSrc.features[iCpt].geometry.coordinates[1]).toFixed(nbDecimalTolere);

                if (!arrVerifDecimal[latArrondis + "," + lngArrondis]) {
                    arrVerifDecimal[latArrondis + "," + lngArrondis] = true; // Garder la location en memoire !
                    docReturn.features.push(documentSrc.features[iCpt]);
                }
            }
        }
    } else {
        docReturn = {
            "name": "ParkingAPI",
            "type": "FeatureCollection",
            "features": []
        };
    }
    return docReturn;
};



exports.preparerDocumentFeaturesFromCouchView = function (doc) {
    // Construire l'objet documentfeatures !
    "use strict";
    var realGeoJsonDoc, iCpt, length;
    realGeoJsonDoc = {
        "name": "ParkingAPI",
        "type": "FeatureCollection",
        "features": []
    };
    if (doc !== undefined && doc.rows !== undefined) {
        length = doc.rows.length; // Speedup js tricks :)
        for (iCpt = 0; iCpt < length; iCpt = iCpt + 1) {
            if (doc.rows[iCpt].doc !== undefined) {
                if (doc.rows[iCpt].doc._id !== undefined && doc.rows[iCpt].doc._rev !== undefined) {
                    delete doc.rows[iCpt].doc._id;
                    delete doc.rows[iCpt].doc._rev;
                }
                realGeoJsonDoc.features.push(doc.rows[iCpt].doc);
            }
        }
    }
    return realGeoJsonDoc;
};

exports.preparerRedisPourGeohash = function (doc) {
    // Construire l'objet documentfeatures !
    "use strict";
    var coordsToAdd, tmpObj, iCpt, length;
    coordsToAdd = [];
    if (doc !== undefined && doc.rows !== undefined) {
        length = doc.rows.length; // Speedup js tricks :)
        for (iCpt = 0; iCpt < length; iCpt = iCpt + 1) {
            if (doc.rows[iCpt].doc !== undefined) {
                coordsToAdd.push([doc.rows[iCpt].doc.geometry.coordinates[1], doc.rows[iCpt].doc.geometry.coordinates[0], doc.rows[iCpt].doc._id]);
            }
        }
    }
    return coordsToAdd;
};

exports.preparerAssociativeArrayPourRedis = function (doc) {
    var associativeArray, tmpObj, iCpt, length, keyToUse;
    associativeArray = [];
    if (doc !== undefined && doc.rows !== undefined) {
        length = doc.rows.length; // Speedup js tricks :)
        for (iCpt = 0; iCpt < length; iCpt = iCpt + 1) {
            if (doc.rows[iCpt].doc !== undefined) {
                keyToUse = doc.rows[iCpt].doc._id;
                tmpObj = doc.rows[iCpt].doc;
                // delete tmpObj._rev;
                //    delete tmpObj._id;
                associativeArray[keyToUse] = tmpObj;
            }
        }
    }
    return associativeArray;
};

exports.computeBoundsFromGeoHashAndCouch = function (rjson, redisDocsParsedByCouchId, response, db, proximityClient, roundLoc, latSW, lngSW, latNE, lngNE) {
    var pointCalc, radiusTarget;

    if (proximityClient !== undefined && lngSW !== undefined && latSW !== undefined && latNE !== undefined && lngNE !== undefined) {
        pointCalc = calculs.calculerPointCentreRectangle(latSW, latNE, lngSW, lngNE);
        radiusTarget = calculs.calcDistance(pointCalc.lat, pointCalc.lng, latNE, lngNE) * 1000; // On doit convertir en metre.
        //console.log('radius target : ' + radiusTarget);

        proximityClient.query(pointCalc.lat, pointCalc.lng, radiusTarget, {
            zset: "geo:parking_api"
        }, function (err, places) {
            function generateCouchResponse() {
                var docToReturn, iCpt, len;

                docToReturn = {
                    "name": "ParkingAPI",
                    "type": "FeatureCollection",
                    "features": []
                };

                len = places.length;
                for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
                    docToReturn.features.push(redisDocsParsedByCouchId[places[iCpt]]);
                }
                return docToReturn;
            }
            if (err) console.error(err);

            if (roundLoc === undefined)
                response.json(rjson.pack(generateCouchResponse()));
            else
                response.json(rjson.pack(exports.retirerWaypointTropProche(generateCouchResponse(), roundLoc)));
        });
    }
}
