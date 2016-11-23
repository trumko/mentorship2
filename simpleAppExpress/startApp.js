var express = require('express');
var router = express.Router();

var requestTime = function (req, res, next) {
  req.requestTime = new Date().toJSON().slice(0,19).replace("T", " ");
  next();
};

router.use(requestTime);


// Load 'index.html' page
router.get(['/', '/index.html'], function(req, res, next) {
  res.sendFile(__dirname + "/" + "index.html");
})

module.exports = router;
