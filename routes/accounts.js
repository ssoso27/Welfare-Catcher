var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const AccountRepository = require('./../repositories/accountRepository.js');
const accountRepo = new AccountRepository(db);

const agegroups = require('./../enum/agegroup.json')
const grades = require('./../enum/disability_grade.json')
const types = require('./../enum/disability_type.json')

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
  var group = body.age_group
  var type = body.disability_type
  var grade = body.disability_grade

  var object = {
    nickname : body.nickname,
    profile_img : body.profile_img,
    email : body.email,
    age_group : agegroups[group],
    disability_type : types[type],
    disability_grade : grades[grade]
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
