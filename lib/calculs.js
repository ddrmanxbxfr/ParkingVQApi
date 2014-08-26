
// Redéfinir le prototype de number pour avoir la formule To Rad.
// Fonction pour convertir en radian...
function toRad(numberToConvert) {
  return numberToConvert * Math.PI / 180;
}

// Calcul de distance entre points
exports.calcDistance = function (latSrc, lngSrc, latTrg, lngTrg){
  var R = 6371;
  var x1 = latTrg - latSrc;
  var dLat = toRad(x1);
  var x2 = lngTrg - lngSrc;
  var dLon = toRad(x2);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(latSrc)) * Math.cos(toRad(latTrg)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;

}

// Ce calcule utilise la formule Haversine !!
exports.isPointInRadius = function (radTarget, latSrc, lngSrc, latTrg, lngTrg) {
  var d = exports.calcDistance(latSrc, lngSrc, latTrg, lngTrg);

  if (d <= radTarget)
    return true;
  else
    return false;
}

exports.calculerPointCentreRectangle = function (h1,h2, b1,b2){
  var ih1 = parseFloat(h1);
  var ih2 = parseFloat(h2);
  var ib1 = parseFloat(b1);
  var ib2 = parseFloat(b2);

  var centreH = (ih1 + ih2) / 2;
  var centreB = (ib1 + ib2) / 2;
  var point = {lat: centreH, lng: centreB};
  return point;
}


exports.isPointInPoly = function(vs, ptLat, ptLng) {
      // Algo trouvé sur...
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var x = ptLng, y = ptLat;

    var inside = false;
    var len = vs.length;
    for (var i = 0, j = len - 1; i < len; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

exports.isPolyInBounds = function(vs, swY, swX, neY, neX)
{
    var len = vs.length;
      for (var i = 0, j = len - 1; i < len; j = i++) {
          var xi = vs[i][0], yi = vs[i][1];
          var xj = vs[j][0], yj = vs[j][1];
          if ((neY > yi || swY > yj) &&
           (neX < xj || swX < xi))
            return true;
      }
      return false;
}
