var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const AccountService = require('./../services/accountService.js');
const AccountRepository = require('./../repositories/accountRepository.js');

const accountRepo = new AccountRepository(db);
const service = new AccountService(accountRepo);

const agegroups = require('./../enum/agegroup.json')
const grades = require('./../enum/disability_grade.json')
const types = require('./../enum/disability_type.json')

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  return new Promise((resolve) => {
    service.list().then(result => {
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
    kakao_id : body.kakao_id,
    password : body.password,
    age_group : agegroups[body.age_group],
    disability_type : types[body.disability_type],
    disability_grade : grades[body.disability_grade],
  }

  return new Promise((resolve) => {
    service.join(object).then(result => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(400).send('회원가입 할 수 없습니다.');
    });
  });
});

router.get('/duplicate-email', function(req, res, next) {
  var email = req.query.email

  return new Promise((resolve) => {
      service.duplicateEmail(email).then(result => {
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
    service.login(params).then(info => {
      req.session.info = info

      var account = {
        nickname: info.account.nickname,
        profile_img: info.account.profile_img,
        email: info.account.email,
        kakao_id: info.account.kakao_id,
        age_group: info.account.age_group,
        disability_type: info.account.disability_type,
        disability_grade: info.account.disability_grade
      }

      res.status(200).send(account);
    })
    .catch(error => {
      res.status(400).send('로그인을 할 수 없습니다.');
    })
  })
})

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {});
  res.status(204).send();
})

router.get('/:email', function(req, res, next) {
  return new Promise((resolve) => {
    var email = req.params.email
    console.log(email+"!!!!!!!!!")
    service.get(email).then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
})

module.exports = router;
