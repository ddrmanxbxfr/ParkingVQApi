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
    var pointCentral;
    before(function (done) {
        pointCentral = calculs.calculerPointCentreRectangle(0, 10, 0, 10);
        done();
    })

    it('should have lat and lng properties', function () {
        pointCentral.should.have.property("lat").and.be.a.Number;
        pointCentral.should.have.property("lng").and.be.a.Number;
    })

    it('Lng for 0,0-10,10 rectangle should be 5', function () {
        pointCentral.lng.should.be.exactly(5).and.be.a.Number;
    });

    it('Lat for 0,0-10,10 rectangle should be 5', function () {
        pointCentral.lat.should.be.exactly(5).and.be.a.Number;
    });
});


describe('Verifier presence d\'un point dans polygone', function () {
    var pointEnDehorsDuPoly, pointALinterieurDuPoly;

    before(function (done) {
        // Definition du polygone avec 0,0,10,10
        var polyTest = [[0.0, 0.0],
                        [10.0, 0.0],
                        [10.0, 10.0],
                        [0.0, 10.0],
                        [0.0, 0.0]];
        var lngInside = 5
        var latInside = 5;

        pointEnDehorsDuPoly = calculs.isPointInPoly(polyTest, 15, 15);
        pointALinterieurDuPoly = calculs.isPointInPoly(polyTest, latInside, lngInside);
        done();
    })

    it('should have point outside poly', function () {
        pointEnDehorsDuPoly.should.be.exactly(false).and.be.a.Boolean;
    })

    it('should have point inside poly', function () {
        pointALinterieurDuPoly.should.be.exactly(true).and.be.a.Boolean;
    })
});

describe('Verifier presence d\'un polygone dans un polygone', function () {
    var isPolyInside, isPolyOutside, isPolyPartiallyInsideFromSouth, isPolyPartiallyInsideFromNorth;

    before(function (done) {
        // Definition du polygone avec 0,0,10,10
        var polyTest = [[0.0, 0.0],
                        [10.0, 0.0],
                        [10.0, 10.0],
                        [0.0, 10.0],
                        [0.0, 0.0]];

        isPolyInside = calculs.isPolyInBounds(polyTest, 4, 4, 5, 5);
        isPolyOutside = calculs.isPolyInBounds(polyTest, 20, 20, 15, 15);
        isPolyPartiallyInsideFromNorth = calculs.isPolyInBounds(polyTest, -10,-10,0.2,0.2);
        isPolyPartiallyInsideFromSouth = calculs.isPolyInBounds(polyTest,9,9,20,20);
        done();
    })

    it('should have poly inside bounds', function () {
        isPolyInside.should.be.exactly(true).and.be.a.Boolean;
    })

    it('should have poly outside bounds', function () {
        isPolyOutside.should.be.exactly(false).and.be.a.Boolean;
    })

    it('should have poly inside from north east', function() {
      isPolyPartiallyInsideFromNorth.should.be.exactly(true).and.be.a.Boolean;
    })

    it('should have poly inside from south west', function() {
      isPolyPartiallyInsideFromSouth.should.be.exactly(true).and.be.a.Boolean;
    })
});
