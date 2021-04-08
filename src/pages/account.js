const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({data: 'get account data'});
});

router.post('/', (req, res) => {
    res.send({data: 'add account data'});
});

router.put('/', (req, res) => {
    res.send({data: 'update account data'});
});

router.delete('/', (req, res) => {
    res.send({data: 'delete account data'});
});


module.exports = router;