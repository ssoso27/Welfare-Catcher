var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const FacilityRepository = require('./../repositories/facilityRepository.js');
const facilityRepo = new FacilityRepository(db);

router.get('/', function(req, res, next) {
  return new Promise((resolve) => {
    const keyword = req.query.keyword
    const size = req.query.size
    const page = req.query.page

    facilityRepo.findAll(keyword, size, page).then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

module.exports = router;