var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Database stuff */
//connect to the data store and the set up the database
var db = mongoose.connection;

//connect to the database
mongoose.connect('mongodb://veneta:112233@ds135790.mlab.com:35790/survey');

//Create a model which connects to the schema and entries collection in the Mandela_Diaries database
var Entry = mongoose.model("Entry", new Schema({gender: 'string', degree:'string', campus: 'string'}), "entries");

mongoose.connection.on("open", function() {
    console.log("mongodb is connected!");
});

//The route for getting data for the database - GET form
router.get("/", function(req, res) {
    //Send the current entries to the page
    Entry.find({}, function(err, entries) {
        console.log(entries);
        if(err) {
            res.status(404).json({"error": "not found", "err":err});
            return;
        } else {
            //res.json(entries);
            res.render('database', {title: 'database', entries: entries});
        }
    });

});

router.post('/', function(req, res) {
    //console.log(date, link);
    //res.redirect('form')
    var newEntry = new Entry({entries: {'gender': req.body.gender, 'degree': req.body.degree, 'campus' : req.body.degree}});
    newEntry.save(function(err, entries){
        //console.log(entries);
        //res.redirect('form');
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.redirect('database');
        };
    });
});

module.exports = router;