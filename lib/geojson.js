var calculs = require('./calculs.js');

// Valide que le document geojson contient des points à l'intérieur.
exports.evaluerSiTypePoint = function(documentGeoJson) {
  var len = documentGeoJson.features.length;
  for (var iCpt = 0; iCpt <  len; iCpt++) {
    if (documentGeoJson.features[iCpt].geometry.type === "Point")
      return true;
  }
  return false;
};

exports.evaluerSiTypePolygon = function(documentGeoJson) {
  var len = documentGeoJson.features.length;
  for (var iCpt = 0; iCpt <  len; iCpt++) {
    if (documentGeoJson.features[iCpt].geometry.type === "Polygon")
      return true;
  }
  return false;
};


// Calcul de distance.
exports.generateGeoJsonDocRadius = function(documentSrc, radiusTarget, lat, lng) {
  var docReturn = {
    "name": documentSrc.name,
    "type": documentSrc.type,
    "features": []
  };

  for (var iCpt = 0; iCpt <  documentSrc.features.length; iCpt++) {
    if (documentSrc.features[iCpt].geometry.type === "Point") {
      if (calculs.isPointInRadius(radiusTarget, lat, lng, documentSrc.features[iCpt].geometry.coordinates[1], documentSrc.features[iCpt].geometry.coordinates[0]))
        docReturn.features.push(documentSrc.features[iCpt]);
    }
  }
  return docReturn;
}

// Calcul de waypoints selon bounds.
exports.generateGeoJsonDocBounds = function(documentSrc, latSW, lngSW, latNE, lngNE) {
  var docReturn = {
    "name": documentSrc.name,
    "type": documentSrc.type,
    "features": []
  };

  // Calculer le point central
  var pointCalc = calculs.calculerPointCentreRectangle(latSW, latNE, lngSW, lngNE);
  var radiusTarget = calculs.calcDistance(pointCalc.lat, pointCalc.lng, latNE, lngNE);
  var len = documentSrc.features.length;

  if (len >  0) // Sanity check
    if (documentSrc.features[0].geometry.type === "Point")
      for (var iCpt = 0; iCpt <  len; iCpt++) {
        if (calculs.isPointInRadius(radiusTarget, pointCalc.lat, pointCalc.lng, documentSrc.features[iCpt].geometry.coordinates[1], documentSrc.features[iCpt].geometry.coordinates[0]))
          docReturn.features.push(documentSrc.features[iCpt]);
      }
     else
      if (documentSrc.features[0].geometry.type === "Polygon")
        for (var iCpt = 0; iCpt <  len; iCpt++) {
          // 1ère stratégie vérifier que le point est dans le polygone.
          // 2e stratégie vérifier que le polygon est à l'intérieur de l'écran
        if (calculs.isPointInPoly(documentSrc.features[iCpt].geometry.coordinates[0],
                                  pointCalc.lat,
                                  pointCalc.lng) ||
            calculs.isPolyInBounds(documentSrc.features[iCpt].geometry.coordinates[0],
                                    latSW,
                                    lngSW,
                                    latNE,
                                    lngNE))
          docReturn.features.push(documentSrc.features[iCpt]);
        }
      return docReturn;
    }

    // Fonction pour retirer les waypoints qui sont trop proches.
  exports.retirerWaypointTropProche = function(documentSrc, nbDecimalTolere) {
    var docReturn = {
      "name": documentSrc.name,
      "type": documentSrc.type,
      "features": []
    };

    var latArrondis, lngArrondis;
    var featureToAdd;

    // Transverser les documents à l'intérieur des nouveaux si fit.

    var length = documentSrc.features.length;
    for (var iCpt = 0; iCpt < length; iCpt++) {
      featureToAdd = documentSrc.features[iCpt];
      latArrondis = parseFloat(featureToAdd.geometry.coordinates[0]);
      lngArrondis = parseFloat(featureToAdd.geometry.coordinates[1]);

      latArrondis = latArrondis.toFixed(nbDecimalTolere);
      lngArrondis = lngArrondis.toFixed(nbDecimalTolere);

      if (validerLatLngPasDansDoc(docReturn, latArrondis, lngArrondis, nbDecimalTolere))
        docReturn.features.push(featureToAdd);

    }
    return docReturn;
  }

  function validerLatLngPasDansDoc(docList, lat, lng, nbDecimalTolere) {
    var length = docList.features.length;
    for (var jCpt = 0; jCpt < length; jCpt++) {
      if (parseFloat(docList.features[jCpt].geometry.coordinates[0]).toFixed(nbDecimalTolere) === lat &&
        parseFloat(docList.features[jCpt].geometry.coordinates[1]).toFixed(nbDecimalTolere) === lng)
        return false;
    }
    return true;
  }


  exports.preparerDocumentFeaturesFromCouchView = function(doc, nameId) {
    // Construire l'objet documentfeatures !
    var realGeoJsonDoc = {
      "name": nameId,
      "type": "FeatureCollection",
      "features": []
    };

    var length = doc.rows.length; // Speedup js tricks :)
    for (var iCpt = 0; iCpt < length; iCpt++) {
      delete doc.rows[iCpt].doc._id;
      delete doc.rows[iCpt].doc._rev;
      realGeoJsonDoc.features.push(doc.rows[iCpt].doc);
    }
    return realGeoJsonDoc;
  }
