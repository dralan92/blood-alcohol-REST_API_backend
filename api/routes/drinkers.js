const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    res.status(200).json({
        message : 'Handling GET'
    });
});

router.get('/:drinkerID', (req, res, next)=> {
    res.status(200).json({
        message : 'Handling GET with ID'
    });
});

router.post('/', (req, res, next)=> {
    res.status(200).json({
        message : 'Handling POST'
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