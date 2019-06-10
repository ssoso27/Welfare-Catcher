var crypto = require('crypto')

module.exports = class AccountService {

    constructor(repository) {
        this.repository = repository
    }

    list() {
        return new Promise((resolve, reject) => {
            this.repository.findAll().then(result => {
                result.forEach((account, index, array) => {
                    account.password = null
                    array[index] = account
                });
                resolve(result);
            })
            .catch(error => {
              reject(error);
            })
          })
    }

    join(params) {
        let inputPassword = params.password;
        let salt = Math.round((new Date().valueOf() * Math.random())) + "";
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        params.password = hashPassword
        params.salt = salt

        return new Promise((resolve, reject) => {
            this.repository.create(params).then(result => {
              resolve()
            })
            .catch(error => {
              reject(error)
            });
          });
    }

    duplicateEmail(email) {
        return new Promise((resolve, reject) => {
            this.repository.findByEmail(email).then(result => {
                resolve(result.length > 0)
              })
              .catch(error => {
                reject(error);
              })
        }) 
    }
    
    login(params) {
        return new Promise((resolve, reject) => {
            this.repository.findByEmail(params.email).then(account => {
                var salt = account[0].salt
                var savedPassword = account[0].password
                
                var inputPassword = params.password
                var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

                if (savedPassword == hashPassword) {
                    resolve()
                } else {
                    reject()
                }
            })
            .catch(error => {
                reject(error)
            })
        });
    }
}