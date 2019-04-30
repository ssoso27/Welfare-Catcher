
module.exports = class FacilityRepository {

    constructor(db) {
        this.db = db;
    }

    findAll() {
        var sql = "SELECT * FROM facilities;"
        
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }
}