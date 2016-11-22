var express = require('express');
var router = express.Router();

// Load 'index.html' page
router.get(['/', '/index.html'], function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})

module.exports = router;
