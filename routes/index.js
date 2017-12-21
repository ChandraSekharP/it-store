var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
  response.render('index', {title: 'IT Store - Home Page', condition: false});
});

module.exports = router;
