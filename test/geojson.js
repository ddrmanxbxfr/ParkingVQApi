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
        geojsonTest.features.push({
            zz: "yo"
        });
        withInvalidObject = geojson.evaluerSiTypePoint(geojsonTest);

        // Clearing then adding reals items
        geojsonTest.features.length = 0;
        geojsonTest.features.push({
            geometry: {
                type: "ZZZZ"
            }
        });
        geojsonTest.features.push({
            geometry: {
                type: "ZZZZ"
            }
        });
        geojsonTest.features.push({
            geometry: {
                type: "ZZZZ"
            }
        });

        isWithoutPoint = geojson.evaluerSiTypePoint(geojsonTest);

        // Adding with point
        geojsonTest.features.push({
            geometry: {
                type: "Point"
            }
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

    it('should be false when there\'s no point element in array', function () {
        isWithoutPoint.should.be.exactly(false).and.be.a.Boolean;
    })

    it('should be true when there\'s point', function () {
        isWithPoint.should.be.exactly(true).and.be.a.Boolean;
    })
});


describe('Verifier Si type polygon', function () {
    var isEmpty, hasNoProps, withInvalidObject, isWithoutPoint, isWithPoint;
    before(function (done) {
        var geojsonTest = {
            features: []
        };

        var geojsonEmpty = {};

        hasNoProps = geojson.evaluerSiTypePolygon(geojsonEmpty);
        isEmpty = geojson.evaluerSiTypePolygon(geojsonTest);


        // Adding invalid elements
        geojsonTest.features.push({
            zz: "yo"
        });
        withInvalidObject = geojson.evaluerSiTypePolygon(geojsonTest);

        // Clearing then adding reals items
        geojsonTest.features.length = 0;
        geojsonTest.features.push({
            geometry: {
                type: "ZZZZ"
            }
        });
        geojsonTest.features.push({
            geometry: {
                type: "ZZZZ"
            }
        });
        geojsonTest.features.push({
            geometry: {
                type: "ZZZZ"
            }
        });

        isWithoutPoint = geojson.evaluerSiTypePolygon(geojsonTest);

        // Adding with point
        geojsonTest.features.push({
            geometry: {
                type: "Polygon"
            }
        });
        isWithPoint = geojson.evaluerSiTypePolygon(geojsonTest);
        done();
    });

    it('should be false when there\'s no props', function () {
        hasNoProps.should.be.exactly(false).and.be.a.Boolean;
    });

    it('should be false when the array is empty', function () {
        isEmpty.should.be.exactly(false).and.be.a.Boolean;
    });

    it('should be false when there\'s no polygon element in array', function () {
        isWithoutPoint.should.be.exactly(false).and.be.a.Boolean;
    })

    it('should be true when there\'s polygon', function () {
        isWithPoint.should.be.exactly(true).and.be.a.Boolean;
    })
});

describe('Preparation des documents de couchdb', function () {
    var isWithoutDocProp, isSupposedToBeValid, isWithoutRowsArray, isRowsEmpty, isUndefined, isWithInvalidCouchdbProps;
    before(function (done) {

        //doc.rows[iCpt].doc
        isUndefined = geojson.preparerDocumentFeaturesFromCouchView(undefined);
        var mockDocument = {}
        isWithoutRowsArray = geojson.preparerDocumentFeaturesFromCouchView(mockDocument);

        var mockDocument = {
            rows: []
        }

        isRowsEmpty = geojson.preparerDocumentFeaturesFromCouchView(mockDocument);

        mockDocument.rows.push({});

        isWithoutDocProp = geojson.preparerDocumentFeaturesFromCouchView(mockDocument);

        mockDocument.length = 0;

        mockDocument.rows.push({
            doc: {
                _id: 1111,
                _rev: 3333,
                tst: "yo"
            }
        });

        mockDocument.rows.push({
            doc: {
                _id: 1111,
                _rev: 3333,
                tst: "yo"
            }
        });

        isSupposedToBeValid = geojson.preparerDocumentFeaturesFromCouchView(mockDocument);

        mockDocument.rows.length = 0;

        mockDocument.rows.push({
            doc: {
                _id: 1111,
                tst: "yo"
            }
        });
        mockDocument.rows.push({
            doc: {
                _rev: 3333,
                tst: "yo"
            }
        });
        isWithInvalidCouchdbProps = geojson.preparerDocumentFeaturesFromCouchView(mockDocument);

        done();
    });

    it('should have empty features when doc is undefined', function () {
        isUndefined.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        isUndefined.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        isUndefined.should.have.property("features");
        isUndefined.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should have empty features when rows is undefined', function () {
        isWithoutRowsArray.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        isWithoutRowsArray.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        isWithoutRowsArray.should.have.property("features");
        isWithoutRowsArray.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should have empty features when rows are empty', function () {
        isRowsEmpty.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        isRowsEmpty.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        isRowsEmpty.should.have.property("features");
        isRowsEmpty.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should have empty features when rows don\'t have valid object', function () {
        isWithoutDocProp.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        isWithoutDocProp.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        isWithoutDocProp.should.have.property("features");
        isWithoutDocProp.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should have 2 documents', function () {
        isSupposedToBeValid.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        isSupposedToBeValid.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        isSupposedToBeValid.should.have.property("features");
        isSupposedToBeValid.features.length.should.be.exactly(2).and.be.a.Number;
    });

    it('should have 2 documents even with invalid couchdbProps', function () {
        isWithInvalidCouchdbProps.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        isWithInvalidCouchdbProps.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        isWithInvalidCouchdbProps.should.have.property("features");
        isWithInvalidCouchdbProps.features.length.should.be.exactly(2).and.be.a.Number;
    });

});


describe('Retirer les waypoints trop proche selon decimal', function () {
    var withTwoPropsUndefined, withoutGeometryProp, withFeaturesUndefined, withFeaturesEmpty, withoutCoordinatesProp;
    before(function (done) {
        var mockData;
        withTwoPropsUndefined = geojson.retirerWaypointTropProche(undefined, undefined);

        mockData = {
            "name": "ParkingAPI",
            "type": "FeatureCollection"
        };

        withFeaturesUndefined = geojson.retirerWaypointTropProche(mockData, 10);

        mockData = {
            "name": "ParkingAPI",
            "type": "FeatureCollection",
            "features": []
        };

        withFeaturesEmpty = geojson.retirerWaypointTropProche(mockData, 10);

        mockData.features.push({});
        mockData.features.push({});
        withoutGeometryProp = geojson.retirerWaypointTropProche(mockData, 10);

        mockData.features.push({
            geometry: {}
        });
        mockData.features.push({
            geometry: {}
        });
        withoutCoordinatesProp = geojson.retirerWaypointTropProche(mockData, 10)

        done();
    })

    it('should be 0 features when props are undefined', function () {
        withTwoPropsUndefined.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withTwoPropsUndefined.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withTwoPropsUndefined.should.have.property("features");
        withTwoPropsUndefined.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 0 features when features is undefined', function () {
        withFeaturesUndefined.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withFeaturesUndefined.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withFeaturesUndefined.should.have.property("features");
        withFeaturesUndefined.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 0 features when features length is 0', function () {
        withFeaturesEmpty.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withFeaturesEmpty.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withFeaturesEmpty.should.have.property("features");
        withFeaturesEmpty.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 0 features when features length is 0', function () {
        withFeaturesEmpty.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withFeaturesEmpty.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withFeaturesEmpty.should.have.property("features");
        withFeaturesEmpty.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 0 features when geometry in objects are undefined', function () {
        withoutGeometryProp.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withoutGeometryProp.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withoutGeometryProp.should.have.property("features");
        withoutGeometryProp.features.length.should.be.exactly(0).and.be.a.Number;
    });
})
