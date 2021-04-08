const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({data: 'get design data'});
});

router.post('/', (req, res) => {
    res.send({data: 'add design data'});
});

router.put('/', (req, res) => {
    res.send({data: 'update design data'});
});

router.delete('/', (req, res) => {
    res.send({data: 'delete design data'});
});


module.exports = router;