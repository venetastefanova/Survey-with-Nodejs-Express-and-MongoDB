//set up mongoose and mongoose.Schema
var mongoose =require('mongoose');
var Schema = mongoose.Schema;

//Export our mongoose model, with a gender, degree and campus
module.exports = mongoose.model('User', new Schema({
   gender: String,
    degree: String,
    campus: String
}));