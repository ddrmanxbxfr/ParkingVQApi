var calculs = require('./../lib/calculs.js');
var should = require('should');

describe('Calculer la distance entre 2 points', function () {
    var distanceEntreDeuxPoints;
    before(function (done) {
        distanceEntreDeuxPoints = calculs.calcDistance(10, 10, 20, 20);
        done();
    });

    it('should have 1544.7575610296099 km distance between', function () {
        distanceEntreDeuxPoints.should.be.exactly(1544.7575610296099).and.be.a.Number;
    });
});


describe('Presence d\'un point dans le rayon', function () {
    var rayonPlusPetitQueDistance, rayonPlusGrandQueDistance;
    before(function (done) {
        rayonPlusPetitQueDistance = calculs.isPointInRadius(1500, 10, 10, 20, 20);
        rayonPlusGrandQueDistance = calculs.isPointInRadius(2000, 10, 10, 20, 20);
        done();
    })

    it('should not be in radius if rad is smaller than distance', function () {
        rayonPlusPetitQueDistance.should.be.exactly(false).and.be.a.Boolean;
    });

    it('should be in radius if rad is bigger than distance', function () {
        rayonPlusGrandQueDistance.should.be.exactly(true).and.be.a.Boolean;
    });
});

describe('Calculer le point centrale d\'un rectangle', function () {


});
