const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { User } = require('../model/user');

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).send('Error on the server.');
        }
        res.status(200).send(users);
    });
});

// Login (POST /api/users/login)
router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            return res.status(500).send('Error on the server.');
        }
        if (!user) {
            return res.status(404).send('No user found.');
        }
        
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (result === true) {
                const token = jwt.sign(
                    { id: user._id, username: user.username, role: user.role },
                    'SECRET_KEY', 
                    { expiresIn: '24h' }
                );
                res.json({
                    auth: true,
                    token: token,
                    username:user.username,
                    role: user.role 
                });
            } else {
                return res.status(401).send({ auth: false, token: null });
            }
        });
    });
});
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            auth: true,
            username: req.user.username,
            role: req.user.role
        });
    } else {
        res.status(401).json({ auth: false, message: "Not logged in" });
    }
});
// Ajout d'un utilisateur (POST /api/users)
router.post('/', function(req, res) {
    let user = new User({
        username: req.body.username,
        role: req.body.role
    });
  
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        user.password = hash;
        user.save((err) => {
            if(err){
                return res.status(500).send('Impossible de créer l\'utilisateur', err);
            }
            res.json({ message: `${user.username} enregistré avec succès!`});
        });
    });
});

module.exports = router;
