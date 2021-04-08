const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({data: 'get home data'});
});

router.post('/', (req, res) => {
    res.send({data: 'add home data'});
});

router.put('/', (req, res) => {
    res.send({data: 'update home data'});
});

router.delete('/', (req, res) => {
    res.send({data: 'delete home data'});
});


module.exports = router;