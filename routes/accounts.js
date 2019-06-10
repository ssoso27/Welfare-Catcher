var express = require('express');
var router = express.Router();
var crypto = require('crypto')

const db = require('./../common/database.js')
const AccountService = require('./../services/accountService.js');
const AccountRepository = require('./../repositories/accountRepository.js');

const accountRepo = new AccountRepository(db);
const accountService = new AccountService(accountRepo);

const agegroups = require('./../enum/agegroup.json')
const grades = require('./../enum/disability_grade.json')
const types = require('./../enum/disability_type.json')

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  return new Promise((resolve) => {
    accountService.list().then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

router.post('/join', function(req, res, next) {
  
  var body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  var object = {
    nickname : body.nickname,
    profile_img : body.profile_img,
    email : body.email,
    kakao_id : body.kakao_id,
    password : hashPassword,
    age_group : agegroups[body.age_group],
    disability_type : types[body.disability_type],
    disability_grade : grades[body.disability_grade],
    salt: salt
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
      accountService.duplicateEmail(email).then(result => {
        res.send(result)
      })
      .catch(error => {
        console.log(error);
      })
  })
})

router.post('/login', function(req, res, next) {

  var body = req.body
  var params = {
    email : body.email,
    password : body.password
  }

  return new Promise((reslove) => {
    accountService.login(params).then(result => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(400).send('로그인을 할 수 없습니다.');
    })
  })
})

module.exports = router;
