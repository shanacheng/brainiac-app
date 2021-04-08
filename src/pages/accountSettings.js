const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({data: 'get account settings data'});
});

router.post('/', (req, res) => {
    res.send({data: 'add account settings data'});
});

router.put('/', (req, res) => {
    res.send({data: 'update account settings data'});
});

router.delete('/', (req, res) => {
    res.send({data: 'delete account settings data'});
});


module.exports = router;