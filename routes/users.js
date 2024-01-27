const express = require('express');
const router = express.Router();
const { User } = require('../model/user');// Récupérer tous les utilisateurs (GET)
router.get('/', function(req, res) {
    User.find({}, (err, users) => {
        if(err){
            res.send(err);
        }
        res.json(users);
    });
  });
  // Ajout d'un utilisateur (POST)
router.post('/', function(req, res) {
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password; // Pensez à hasher le mot de passe ici
    user.role = req.body.role;
  
    console.log("POST user reçu :");
    console.log(user);
  
    user.save((err) => {
        if(err){
            res.send('Impossible de créer l\'utilisateur', err);
        }
        res.json({ message: `${user.username} enregistré avec succès!`});
    });
  });
module.exports = router;