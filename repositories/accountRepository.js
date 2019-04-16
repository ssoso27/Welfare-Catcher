
module.exports = class AccountRepository {

    constructor(db) {
        this.db = db;
    }

    findAll() {
        var sql = "SELECT * FROM accounts;"
        
        return new Promise((reslove, reject) => {
            this.db.query(sql).then((result) => {
                // console.log(result)
                reslove(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }
}