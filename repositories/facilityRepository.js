
module.exports = class FacilityRepository {

    constructor(db) {
        this.db = db;
    }

    findAll(keyword='%', size=10, page=1) {
        var offset = (page-1)*size
        var sql = `SELECT * FROM facilities WHERE name Like '${keyword}' LIMIT ${size} OFFSET ${offset};`;

        console.log(keyword)
        console.log(size)
        console.log(page)
        console.log(sql)
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