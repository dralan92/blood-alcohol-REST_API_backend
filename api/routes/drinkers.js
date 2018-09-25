const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Drinker = require('../models/drinkers');

router.get('/', (req, res, next)=> {
    Drinker.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });
});

router.get('/:drinkerID', (req, res, next)=> {
   const id = req.params.drinkerID;
   Drinker.findById(id)
   .exec()
   .then(doc=>{
       console.log(doc);
       res.status(200).json(doc);
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({error : err});
   });
});

router.post('/', (req, res, next)=> {

    const drinker = new Drinker({

        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        email : req.body.email

    });

    drinker
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message : 'Handling POST',
            drinker : result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error : err});
    });

   
});

router.patch('/:drinkerID', (req, res, next)=>{
    res.status(200).json({
        message : 'Drinker Updated'
    });
});


router.delete('/:drinkerID', (req, res, next)=>{
    res.status(200).json({
        message : 'Drinker Deleted'
    });
});
module.exports = router;