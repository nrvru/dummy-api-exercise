
var express = require('express');
var path = require('path');
var objectService = require('./object_service');
var rs = require('./render_services');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes
app.get('/:object_name_url' , function(req, res){
    var objectNameUrl = req.params.object_name_url;

    objectService.getObject(objectNameUrl, function(err, object){
        if(err){
            res.status(404);
            res.render('error', {pageTitle: 'Error'});
            return;
        }

        res.render('index', {title: 'Object', renderedObject: rs.renderObject(object), object: object});
    });
});

var port = 3000;
app.listen(port, function(){
    console.log('Listening on port: ' + port);
});

