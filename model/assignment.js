let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
//remplacer Assignment = assignments (ils vont marcher)
// le premier pararramètres est le nom de la collection. Notez que 
//Mongoose fait du "matching" et prend la collection dont le nom 
// est le plus proche
module.exports = mongoose.model('assignments', AssignmentSchema);
