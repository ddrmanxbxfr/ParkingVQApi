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
    var withTwoPropsUndefined, withoutGeometryProp, withFeaturesUndefined, withFeaturesEmpty, withoutCoordinatesProp, withInvalidDataType, withNumberRounded, withDistinctNumber;
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

        mockData.features.length = 0;

        mockData.features.push({
            geometry: {
                coordinates: ["AA", 0]
            }
        });

        mockData.features.push({
            geometry: {
                coordinates: [0, "BB"]
            }
        });

        mockData.features.push({
            geometry: {
                coordinates: ["ZZ", "CC"]
            }
        });

        withInvalidDataType = geojson.retirerWaypointTropProche(mockData, 10);

        mockData.features.length = 0;

        mockData.features.push({
            geometry: {
                coordinates: [10.555, 10.555]
            }
        });

        mockData.features.push({
            geometry: {
                coordinates: [10.554, 10.554]
            }
        });

        withNumberRounded = geojson.retirerWaypointTropProche(mockData, 2);

        withDistinctNumber = geojson.retirerWaypointTropProche(mockData, 5);

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

    it('should be 0 features when coordinates in objects are undefined', function () {
        withoutCoordinatesProp.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withoutCoordinatesProp.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withoutCoordinatesProp.should.have.property("features");
        withoutCoordinatesProp.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 0 features when datatype is invalid', function () {
        withInvalidDataType.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withInvalidDataType.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withInvalidDataType.should.have.property("features");
        withInvalidDataType.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 1 features the others were dupes because length was 3 and round 2', function () {
        withNumberRounded.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withNumberRounded.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withNumberRounded.should.have.property("features");
        withNumberRounded.features.length.should.be.exactly(1).and.be.a.Number;
        withNumberRounded.features[0].geometry.coordinates[0].should.be.exactly(10.555).and.be.a.Number;
        withNumberRounded.features[0].geometry.coordinates[1].should.be.exactly(10.555).and.be.a.Number;
    });

    it('should be 2 features the others were rounded not rounded as length was 3 and round 5', function () {
        withDistinctNumber.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        withDistinctNumber.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        withDistinctNumber.should.have.property("features");
        withDistinctNumber.features.length.should.be.exactly(2).and.be.a.Number;
        withDistinctNumber.features[0].geometry.coordinates[0].should.be.exactly(10.555).and.be.a.Number;
        withDistinctNumber.features[0].geometry.coordinates[1].should.be.exactly(10.555).and.be.a.Number;
        withDistinctNumber.features[1].geometry.coordinates[0].should.be.exactly(10.554).and.be.a.Number;
        withDistinctNumber.features[1].geometry.coordinates[1].should.be.exactly(10.554).and.be.a.Number;
    });
})


describe('Generate Geojson document from bounds', function () {
    var itShouldHavePolyInside, itShouldNotHavePolyCoordsInvalid, itShouldBeNormalRun, itShouldHaveFeaturesUndefined, itShouldHaveParmsUndefined, itShouldBeEmptyAsUndefinedCoords;
    before(function (done) {
        var mockData, mockPolygon;

        itShouldHaveParmsUndefined = geojson.generateGeoJsonDocBounds(undefined,
            undefined,
            undefined,
            undefined,
            undefined);


        mockData = {
            "name": "ParkingAPI",
            "type": "FeatureCollection"
        };

        itShouldHaveFeaturesUndefined = geojson.generateGeoJsonDocBounds(mockData, 10, 10, 20, 20);

        // ** Test relies au points ! **
        mockData = {
            "name": "ParkingAPI",
            "type": "FeatureCollection",
            "features": []
        };

        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [15, 15]
            }
        });

        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [14, 15]
            }
        });

        itShouldBeNormalRun = geojson.generateGeoJsonDocBounds(mockData, 10, 10, 20, 20);

        mockData.features.length = 0;
        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [undefined, undefined]
            }
        });

        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [undefined, undefined]
            }
        });

        itShouldBeEmptyAsUndefinedCoords = geojson.generateGeoJsonDocBounds(mockData, 10, 10, 20, 20);

        // Test relies au Polygones !

        mockPolygon = [[[0.0, 0.0],
                        [10.0, 0.0],
                        [10.0, 10.0],
                        [0.0, 10.0],
                        [0.0, 0.0]]];

        mockData.features.length = 0;
        mockData.features.push({
            geometry: {
                type: "Polygon",
                coordinates: mockPolygon
            }
        });

        // partiellement a l'interieur du nord est.
        mockData.features.push({
            geometry: {
                type: "Polygon",
                coordinates: [[[-30, -30],
                        [10.0, -30],
                        [10.0, 10.0],
                        [-30, 10.0],
                        [-30, -30]]]
            }
        });

        // Bigger than bounds
        mockData.features.push({
            geometry: {
                type: "Polygon",
                coordinates: [[[-30, -30],
                        [40, -30],
                        [40, 40],
                        [-30, 40],
                        [-30, -30]]]
            }
        });

        // Partiellement a l'interieur du sud ouest.
        mockData.features.push({
            geometry: {
                type: "Polygon",
                coordinates: [[[19, 19],
                        [40, 19],
                        [40, 40],
                        [19, 40],
                        [19, 19]]]
            }
        });

        itShouldHavePolyInside = geojson.generateGeoJsonDocBounds(mockData, -20, -20, 20, 20);

        mockData.features.length = 0;
        mockData.features.push({
            geometry: {
                type: "Polygon",
                coordinates: [[[19, undefined],
                        [undefined, 19],
                        [40, undefined],
                        [19, 40],
                        [undefined, 19]]]
            }
        });

        itShouldNotHavePolyCoordsInvalid = geojson.generateGeoJsonDocBounds(mockData, -20, -20, 20, 20);

        done();
    })

    it('should be 2 points in document', function () {
        itShouldBeNormalRun.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldBeNormalRun.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldBeNormalRun.should.have.property("features");
        itShouldBeNormalRun.features.length.should.be.exactly(2).and.be.a.Number;
        itShouldBeNormalRun.features[0].geometry.coordinates[0].should.be.exactly(15).and.be.a.Number;
        itShouldBeNormalRun.features[0].geometry.coordinates[1].should.be.exactly(15).and.be.a.Number;
        itShouldBeNormalRun.features[1].geometry.coordinates[0].should.be.exactly(14).and.be.a.Number;
        itShouldBeNormalRun.features[1].geometry.coordinates[1].should.be.exactly(15).and.be.a.Number;
    });

    it('should be 0 points as features was undefined', function () {
        itShouldHaveFeaturesUndefined.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldHaveFeaturesUndefined.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldHaveFeaturesUndefined.should.have.property("features");
        itShouldHaveFeaturesUndefined.features.length.should.be.exactly(0).and.be.a.Number;
    });


    it('should be 0 points as parms were undefined', function () {
        itShouldHaveParmsUndefined.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldHaveParmsUndefined.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldHaveParmsUndefined.should.have.property("features");
        itShouldHaveParmsUndefined.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 0 points as coords were undefined', function () {
        itShouldBeEmptyAsUndefinedCoords.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldBeEmptyAsUndefinedCoords.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldBeEmptyAsUndefinedCoords.should.have.property("features");
        itShouldBeEmptyAsUndefinedCoords.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 4 polygon inside the bounds', function () {
        itShouldHavePolyInside.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldHavePolyInside.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldHavePolyInside.should.have.property("features");
        itShouldHavePolyInside.features.length.should.be.exactly(4).and.be.a.Number;
    });

    it('should be 0 polygon as coords were undefined', function () {
        itShouldNotHavePolyCoordsInvalid.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldNotHavePolyCoordsInvalid.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldNotHavePolyCoordsInvalid.should.have.property("features");
        itShouldNotHavePolyCoordsInvalid.features.length.should.be.exactly(0).and.be.a.Number;
    });
})



describe('Generate Geojson document from radius', function () {
    var itShouldHavePolyInside, itShouldNotHavePolyCoordsInvalid, itShouldBeNormalRun, itShouldHaveFeaturesUndefined, itShouldHaveParmsUndefined, itShouldBeEmptyAsUndefinedCoords;
    before(function (done) {
        var mockData;

        itShouldHaveParmsUndefined = geojson.generateGeoJsonDocRadius(undefined, undefined, undefined, undefined);


        mockData = {
            "name": "ParkingAPI",
            "type": "FeatureCollection"
        };

        itShouldHaveFeaturesUndefined = geojson.generateGeoJsonDocRadius(mockData, 10, 10, 20);

        // ** Test relies au points ! **
        mockData = {
            "name": "ParkingAPI",
            "type": "FeatureCollection",
            "features": []
        };

        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [15, 15]
            }
        });

        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [14, 15]
            }
        });

        itShouldBeNormalRun = geojson.generateGeoJsonDocRadius(mockData, 10, 15, 15);

        mockData.features.length = 0;
        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [undefined, undefined]
            }
        });

        mockData.features.push({
            geometry: {
                type: "Point",
                coordinates: [undefined, undefined]
            }
        });

        itShouldBeEmptyAsUndefinedCoords = geojson.generateGeoJsonDocRadius(mockData, 10, 15, 15);
        done();
    })

    it('should be 2 points in document', function () {
        itShouldBeNormalRun.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldBeNormalRun.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldBeNormalRun.should.have.property("features");
        itShouldBeNormalRun.features.length.should.be.exactly(2).and.be.a.Number;
        itShouldBeNormalRun.features[0].geometry.coordinates[0].should.be.exactly(15).and.be.a.Number;
        itShouldBeNormalRun.features[0].geometry.coordinates[1].should.be.exactly(15).and.be.a.Number;
        itShouldBeNormalRun.features[1].geometry.coordinates[0].should.be.exactly(14).and.be.a.Number;
        itShouldBeNormalRun.features[1].geometry.coordinates[1].should.be.exactly(15).and.be.a.Number;
    });

    it('should be 0 points as features was undefined', function () {
        itShouldHaveFeaturesUndefined.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldHaveFeaturesUndefined.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldHaveFeaturesUndefined.should.have.property("features");
        itShouldHaveFeaturesUndefined.features.length.should.be.exactly(0).and.be.a.Number;
    });


    it('should be 0 points as parms were undefined', function () {
        itShouldHaveParmsUndefined.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldHaveParmsUndefined.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldHaveParmsUndefined.should.have.property("features");
        itShouldHaveParmsUndefined.features.length.should.be.exactly(0).and.be.a.Number;
    });

    it('should be 0 points as coords were undefined', function () {
        itShouldBeEmptyAsUndefinedCoords.should.have.property("name").and.be.exactly("ParkingAPI").and.be.a.String;
        itShouldBeEmptyAsUndefinedCoords.should.have.property("type").and.be.exactly("FeatureCollection").and.be.a.String;
        itShouldBeEmptyAsUndefinedCoords.should.have.property("features");
        itShouldBeEmptyAsUndefinedCoords.features.length.should.be.exactly(0).and.be.a.Number;
    });
})
