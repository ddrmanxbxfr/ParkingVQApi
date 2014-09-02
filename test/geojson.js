var geojson = require('./../lib/geojson.js');
var should = require('should');


describe('Verifier Si type point', function () {
    var isEmpty, hasNoProps, withInvalidObject, isWithoutPoint, isWithPoint;
    before(function (done) {
        var geojsonTest = {
            features: []
        };

        var geojsonEmpty = {};

        hasNoProps = geojson.evaluerSiTypePoint(geojsonEmpty);
        isEmpty = geojson.evaluerSiTypePoint(geojsonTest);


        // Adding invalid elements
        geojsonTest.features.push({zz: "yo"});
        withInvalidObject = geojson.evaluerSiTypePoint(geojsonTest);

        // Clearing then adding reals items
        geojsonTest.features.length = 0;
        geojsonTest.features.push({
            geometry: {type: "ZZZZ" }
        });
        geojsonTest.features.push({
            geometry: {type: "ZZZZ" }
        });
        geojsonTest.features.push({
            geometry: {type: "ZZZZ" }
        });

        isWithoutPoint = geojson.evaluerSiTypePoint(geojsonTest);

        // Adding with point
        geojsonTest.features.push({
            geometry: {type: "Point" }
        });
        isWithPoint = geojson.evaluerSiTypePoint(geojsonTest);
        done();
    });

    it('should be false when there\'s no props', function () {
        hasNoProps.should.be.exactly(false).and.be.a.Boolean;
    });

    it('should be false when the array is empty', function () {
        isEmpty.should.be.exactly(false).and.be.a.Boolean;
    });

    it('should be false when there\'s no point element in array', function() {
        isWithoutPoint.should.be.exactly(false).and.be.a.Boolean;
    })

    it('should be true when there\'s point', function() {
        isWithPoint.should.be.exactly(true).and.be.a.Boolean;
    })
});
