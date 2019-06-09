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
  var body = req.body;
  var object = {
    nickname : body.nickname,
    profile_img : body.profile_img,
    email : body.email,
    age_group : body.age_group,
    disability_type : body.disability_type,
    disability_grade : body.disability_grade
  }

  return new Promise((resolve) => {
    accountRepo.create(object).then(result => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(400).send();
    });
  });
});

router.get('/duplicate-email', function(req, res, next) {
  var email = req.query.email

  return new Promise((resolve) => {
      accountRepo.findByEmail(email).then(result => {
        res.send(result.length != 0)
      })
      .catch(error => {
        console.log(error);
      })
  })
})

module.exports = router;
