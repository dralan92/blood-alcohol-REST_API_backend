const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const moment = require('moment');

const Drinker = require('../models/drinkers');

router.get('/', (req, res, next)=> {
    Drinker.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
            res.status(200).json(docs);
        }else{
            res.status(404).json({
                message : 'No Entries Found'
            });
        }
            
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

router.get('/email/:drinkerEmail', (req, res, next)=>{
    const email_arg = req.params.drinkerEmail;
    
    Drinker.findOne({email : email_arg})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error : err});
    });
});
router.get('/password/:drinkerPass', (req, res, next)=>{
    const pass_arg = req.params.drinkerPass;
    
    Drinker.findOne({password : pass_arg})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error : err});
    });
});

router.post('/', (req, res, next)=> {

    const litersOfBlood = parseFloat(req.body.weight) * .07 * 1.06;
    const alcoholRemovalRate = (((parseFloat(req.body.weight)/10)/60)/60) /1000 ;//every millisecond
    
    const drinker = new Drinker({

        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        weight : req.body.weight,
        liters_of_blood : litersOfBlood,
        alcohol_removal_rate : alcoholRemovalRate

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
    const id = req.params.drinkerID;
    const updateOps = {};
    for( const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Drinker.update({_id : id}, {$set : updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });

});


router.delete('/:drinkerID', (req, res, next)=>{
    const id = req.params.drinkerID;
    Drinker.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error : err})
    });
});
module.exports = router;