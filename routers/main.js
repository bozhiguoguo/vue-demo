/**
 * Created by zgg on 2018/4/11
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main/index')
})
module.exports = router;