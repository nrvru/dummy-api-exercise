
var App = React.createClass({
    render: function(){
        var data = JSON.parse(document.getElementById('data').innerHTML);

        return (
            <div className="app">
                <h1> Object </h1>
                <ObjectComponent data={data} />
            </div>
        );
    }
});

var ObjectComponent = React.createClass({
    render: function(){
        var properties = [];
        var embeddedObjects = [];
        var propertiesObject = this.props.data.properties;
        for(var key in propertiesObject){
            if(propertiesObject.hasOwnProperty(key)){
                if(propertiesObject[key].properties){
                    embeddedObjects.push((
                        <ObjectComponent key={propertiesObject[key].name} data={propertiesObject[key]} />
                    ))
                } else {
                    properties.push((
                        <Property key={propertiesObject[key].name} data={propertiesObject[key]} />
                    ))
                }
            }
        }
        // Set embedded object to end
        properties = properties.concat(embeddedObjects);

        return (
            <div className="object">
                <div className="object--name">
                    {this.props.data.name}
                </div>
                <div className="object--properties">
                    {properties}
                </div>
            </div>
        );
    }
});

var Property = React.createClass({
    render: function(){
        var propertyTemplate;
        var data = this.props.data;

        if(data.value){
            propertyTemplate = <div>{data.name} {data.value} {data.unit}</div>;
        } else {
            propertyTemplate = <div>{data.name} Yes</div>;
        }

        return (
            <div className="property">
                {propertyTemplate}
            </div>
        );
    }
});

React.render(
    <App />,
    document.getElementById('app')
);

