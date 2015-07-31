
var EventEmitter = require('events').EventEmitter;
var fdb = require('./fake_db');

var ee = new EventEmitter();

var count = 0;

function buildObject(object){
    count++;
    var propertiesNames = [];

    for(var key in object.properties){
        if (object.properties.hasOwnProperty(key)) {
            propertiesNames.push(key);
        }
    }

    fdb.findByName(propertiesNames, function(err, properties){
        //console.log("Call to db");
        for(var i = 0; i < propertiesNames.length; i++){
            var propertyName = propertiesNames[i];

            if(typeof object.properties[propertyName] === 'number'){
                var value = object.properties[propertyName];
                object.properties[propertyName] = find(properties, function(p){return p.name === propertyName});
                object.properties[propertyName].value = value;
                continue;
            }

            object.properties[propertyName] = find(properties, function(p){return p.name === propertyName});

            if(object.properties[propertyName].properties){
                buildObject(object.properties[propertyName]);
            }
        }
        count--;
        if(count===0){
            ee.emit('complete');
        }
    });
}


// find element in array by predicate
function find(array, predicate){
    if (!array instanceof Array) {
        throw new TypeError('array must be Array=)');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }
    var list = array;
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
            return value;
        }
    }
    return undefined;
}


function getObject(objectNameUrl, cb){
    fdb.findByNameUrl([objectNameUrl], function(err, data){
        if(err || !data[0]) {
            cb(err || 'Object not found');
            return;
        }


        var object = data[0];
        buildObject(object);

        ee.on('complete', function(){
            cb(null, object);
            ee.removeAllListeners();
        });
    })
}

module.exports.getObject = getObject;