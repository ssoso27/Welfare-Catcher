var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const ServiceRepository = require('./../repositories/serviceRepository.js');
const serviceRepo = new ServiceRepository(db);

router.get('/search', function(req, res, next) {
  return new Promise((resolve) => {
    const disability_type = req.query.disability_type
    const disability_grade = req.query.disability_grade
    const age_group = req.query.age_group
    const size = req.query.size
    const page = req.query.page

    serviceRepo.search(disability_type, disability_grade, age_group, size, page).then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

module.exports = router;