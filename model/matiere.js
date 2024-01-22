let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let MatiereSchema = Schema({
    id:Number,
    nomMatiere:String,
    photoMatiere:String,
    photoProf:String
})
const Matiere = mongoose.model('Matiere', MatiereSchema);
module.exports = {Matiere};
