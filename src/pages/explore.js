const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({data: 'get explore data'});
});

router.post('/', (req, res) => {
    res.send({data: 'add explore data'});
});

router.put('/', (req, res) => {
    res.send({data: 'update explore data'});
});

router.delete('/', (req, res) => {
    res.send({data: 'delete explore data'});
});


module.exports = router;