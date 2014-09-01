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
