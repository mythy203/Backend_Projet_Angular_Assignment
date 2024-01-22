const express = require('express');
const router = express.Router();
const { Matiere } = require('../model/matiere');
router.get('/', function(req, res) {
    Matiere.find({}, (err, matieres) => {
        if(err){
            res.send(err);
        }
        res.json(matieres);
    });
  });

module.exports = router;
