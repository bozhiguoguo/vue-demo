/**
 * Created by zgg on 2018/4/11
 */
const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.send('user Hello')
})
module.exports = router;