var express = require('express');
var router = express.Router();

const db = require('./../common/database.js')
const ReceiveServiceRepo = require('./../repositories/receiveServiceRepository.js');
const repository = new ReceiveServiceRepo(db);
const FacilityRepository = require('./../repositories/facilityRepository.js');
const facilityRepo = new FacilityRepository(db);

router.post('/toggle', function(req, res, next) {
    var body = req.body
    var params = {
        accountId: body.accountId,
        serviceId: body.serviceId
    }

    return new Promise((reslove) => {
        repository.find(params).then(result => {
            var isReceive = false
            console.log('find end ')
            if(result.length == 0) {
                // on
                repository.create(params)
                isReceive = true
                console.log('on')
            } else {
                // off
                repository.delete(params)
                console.log('off')
            }
          res.status(200).send(isReceive);
        })
        .catch(error => {
          res.status(400).send('toggle 실패');
        })
      })
})

router.get('/account/:id', function(req, res, next) {
  return new Promise((resolve) => {
    const accountId = req.params.id
    const size = req.query.size
    const page = req.query.page

    facilityRepo.findReceivedList(accountId, size, page).then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
  })
});

module.exports = router;
