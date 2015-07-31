
function renderObject(object){
    var str = '<ul>';
    str += '<li class="main">' + object.name + '</li>';

    if(object.properties){
        var embeddedObjects = [];
        for(var propertyName in object.properties){
            if(object.properties.hasOwnProperty(propertyName)){
                var property = object.properties[propertyName];

                if(property.properties){
                    embeddedObjects.push(property);
                    continue;
                }

                if(property.value){
                    str += '<li>' + property.name + ' ' + property.value
                        + ' ' + (property.unit ? property.unit : '') + '</li>';
                    continue;
                }

                if(propertyName === object.properties[propertyName].name) {
                    str += '<li>' + propertyName + ' Yes' + '</li>';
                }
            }
        }

        for(var i = 0; i < embeddedObjects.length; i++){
            str += renderObject(embeddedObjects[i]);
        }
    }

    str += '</ul>';
    return str;
}

module.exports.renderObject = renderObject;
