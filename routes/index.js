var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from server!' });
})

module.exports = router;
