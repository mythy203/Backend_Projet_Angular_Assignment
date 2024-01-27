const express = require('express');
const router = express.Router();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

// Récupérer tous les utilisateurs (GET)
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
    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        user.password = hash;
        user.role = req.body.role;

        user.save((err) => {
            if(err){
                res.send('Impossible de créer l\'utilisateur', err);
            }
            res.json({ message: `${user.username} enregistré avec succès!`});
        });
    });
});
router.post('/login', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toJSON(), SECRET_KEY, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ message: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});

module.exports = router;