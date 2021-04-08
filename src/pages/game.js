const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({data: 'get game data'});
});

router.post('/', (req, res) => {
    res.send({data: 'add game data'});
});

router.put('/', (req, res) => {
    res.send({data: 'update game data'});
});

router.delete('/', (req, res) => {
    res.send({data: 'delete game data'});
});


module.exports = router;