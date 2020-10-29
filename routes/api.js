const express = require('express');
const router = express.Router();
const Form = require('../models/form');

//Routes
router.get('/', (req,res) => {

    Form.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', daerrorta);
        });
});

router.post('/save', (req,res) => {
    const data = req.body;
    const newForm = new Form(data);
    newForm.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server error!' });
            return;
        }
        res.json({
            msg: 'We received your data!'
        });
    });
});

router.get('/name', (req,res) => {
    const data = {
        username: 'Kandpal',
        age: 23
    };
    res.json(data);
});

module.exports = router;