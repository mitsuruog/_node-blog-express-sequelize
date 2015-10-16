var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('jade-example', {
    title: 'Express',
    author: {
      twitter: '@mitsuruog',
      name: 'mitsuruog'
    },
    tags: ['express', 'node', 'javascript']
  });
});

module.exports = router;
