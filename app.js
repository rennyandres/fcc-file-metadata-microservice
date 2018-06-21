// app.js

// IMPORTS --------------------------------------------------------------------
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var upload = require('express-fileupload');


// CONFIG ---------------------------------------------------------------------
app.set('view engine', 'ejs');
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload());


// ROUTES ---------------------------------------------------------------------
app.get('/', function(req, res) {
    res.render('index');
});

app.post('/api/readthisfile', function(req, res) {
    if(req.files) {
        res.send({
            "name": req.files.upfile.name,
            "type": req.files.upfile.mimetype,
            "size": req.files.upfile.data.length
        });
    }
    else {
        res.json({
            "error" : 'No file was found' 
        })
    }
});


// LISTENING ------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Serving on port ' + process.env.PORT);
});
