/*jslint nomen: true */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, exports: false, process: false, require: false, setInterval: false, setTimeout: false*/
// Redéfinir le prototype de number pour avoir la formule To Rad.
// Fonction pour convertir en radian...
function toRad(numberToConvert) {
    "use strict";
    return numberToConvert * Math.PI / 180;
}

// Calcul de distance entre points
exports.calcDistance = function (latSrc, lngSrc, latTrg, lngTrg) {
    "use strict";
    var R, x1, dLat, x2, dLon, a, c, d;
    R = 6371;
    x1 = latTrg - latSrc;
    dLat = toRad(x1);
    x2 = lngTrg - lngSrc;
    dLon = toRad(x2);
    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(latSrc)) * Math.cos(toRad(latTrg)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    d = R * c;
    return d;
};

// Ce calcule utilise la formule Haversine !!
exports.isPointInRadius = function (radTarget, latSrc, lngSrc, latTrg, lngTrg) {
    "use strict";
    var d = exports.calcDistance(latSrc, lngSrc, latTrg, lngTrg);

    if (d <= radTarget) {
        return true;
    } else {
        return false;
    }
};

exports.calculerPointCentreRectangle = function (h1, h2, b1, b2) {
    "use strict";
    var ih1, ih2, ib1, ib2, centreH, centreB, point;
    ih1 = parseFloat(h1);
    ih2 = parseFloat(h2);
    ib1 = parseFloat(b1);
    ib2 = parseFloat(b2);

    centreH = (ih1 + ih2) / 2;
    centreB = (ib1 + ib2) / 2;
    point = {
        lat: centreH,
        lng: centreB
    };
    return point;
};


exports.isPointInPoly = function (vs, ptLat, ptLng) {
    "use strict";
    // Algo trouvé sur...
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var x, y, inside, len, i, j, xi, yi, xj, yj, intersect;
    x = ptLng;
    y = ptLat;

    inside = false;
    len = vs.length;
    for (i = 0, j = len - 1; i < len; j = i = i + 1) {
        xi = vs[i][0];
        yi = vs[i][1];
        xj = vs[j][0];
        yj = vs[j][1];
        intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
};

exports.isPolyInBounds = function (vs, swY, swX, neY, neX) {
    "use strict";
    var len, i, j, xi, yi, yj, xj;
    len = vs.length;
    for (i = 0, j = len - 1; i < len; j = i = i + 1) {
        xi = vs[i][0];
        yi = vs[i][1];
        xj = vs[j][0];
        yj = vs[j][1];
        if ((neY > yi || swY > yj) && (neX < xj || swX < xi)) {
            return true;
        }
    }
    return false;
};
