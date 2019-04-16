var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const AccountRepository = require('./../repositories/accountRepository.js');
const accountRepo = new AccountRepository(db);

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  return new Promise((resolve) => {
    accountRepo.findAll().then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

router.post('/join', function(req, res, next) {
  res.send('test');
});

module.exports = router;
