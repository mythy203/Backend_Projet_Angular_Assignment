let mongoose = require('mongoose');

//Pagination
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    // pour les nouvelles propriétés
    auteur: String,
    remarques: String,
    note: Number,
    nomMatiere: String,
    photoMatiere: String,
    photoProf: String
});
//Pagination
AssignmentSchema.plugin(aggregatePaginate);

// Récupérer tous les assignments (GET)

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
//remplacer Assignment = assignments (ils vont marcher)
// le premier pararramètres est le nom de la collection. Notez que 
//Mongoose fait du "matching" et prend la collection dont le nom 
// est le plus proche
module.exports = mongoose.model('assignments', AssignmentSchema);


