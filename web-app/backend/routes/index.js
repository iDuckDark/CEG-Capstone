const express = require('express');
const router = express.Router();

router.get('/', function(_req, res, next) {
  res.render('index', {
    title: 'CEG-Capstone Group by Nevin, Peter, Divyang, Paul, Shail',
  });
});

module.exports = router;
