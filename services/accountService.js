var crypto = require('crypto')

module.exports = class AccountService {

    constructor(repository) {
        this.repository = repository
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