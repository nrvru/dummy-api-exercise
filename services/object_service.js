
var _ = require('lodash');
var fdb = require('../data/fake_db');

var rawObject;

function getProperties(objects, cb){

    var properties = [];

    _.forEach(objects, function(object){
        _.forEach(object.properties, function(value, key){
            properties.push(key);
        });
    });

    properties = _.uniq(properties);

    var embeddedObjects = [];

    fdb.findByName(properties, function(err, data){
        _.forEach(objects, function(object){
            _.forEach(object.properties, function(value, key){

                object.properties[key] = _.find(data, function(d){ return d.name === key; });
                var property = object.properties[key];

                if(_.isNumber(value)){
                    property.value = value;
                } else {
                    if(property.properties){
                        embeddedObjects.push(property);
                    }
                }
            });
        });

        if(embeddedObjects.length > 0){
            getProperties(embeddedObjects, cb);
        } else {
            cb(null, rawObject);
        }
    });
}


function getObjectByNameUrl(objectNameUrl, cb){
    fdb.findByNameUrl([objectNameUrl], function(err, data){
        if(err || !data[0]) {
            cb(err || 'Object not found');
            return;
        }

        rawObject = data[0];
        getProperties([rawObject], cb);
    })
}

module.exports.getObjectByNameUrl = getObjectByNameUrl;