var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const ServiceRepository = require('./../repositories/serviceRepository.js');
const serviceRepo = new ServiceRepository(db);

const agegroups = require('./../enum/agegroup.json')
const grades = require('./../enum/disability_grade.json')
const types = require('./../enum/disability_type.json')

router.get('/search', function(req, res, next) {
  return new Promise((resolve) => {
    const disability_type = types[req.query.disability_type]
    const disability_grade = grades[req.query.disability_grade]
    const age_group = agegroups[req.query.age_group]
    const size = req.query.size
    const page = req.query.page

    serviceRepo.search(disability_type, disability_grade, age_group, size, page).then(result => {
      result.forEach((service, index, array) => {
        service.age_group = agegroups[service.age_group]
        service.disability_grade = grades[service.disability_grade]
        service.disability_type = types[service.disability_type]
        
        array[index] = service
      });

      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

router.get('/', function(req, res, next) {
  return new Promise((resolve) => {
    const keyword = req.query.keyword
    const size = req.query.size
    const page = req.query.page

    serviceRepo.findAll(keyword, size, page).then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

module.exports = router;