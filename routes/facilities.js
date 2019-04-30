var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const FacilityRepository = require('./../repositories/facilityRepository.js');
const facilityRepo = new FacilityRepository(db);

router.get('/', function(req, res, next) {
  return new Promise((resolve) => {
    facilityRepo.findAll().then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

module.exports = router;