
module.exports = class ServiceRepository {

    constructor(db) {
        this.db = db;
    }

    search(disability_type='%', disability_grade='%', age_group='%', size=10, page=1) {
        var offset = (page-1)*size
        var sql = `SELECT s.service_id, s.name, t.age_group, t.disability_grade, t.disability_type ` + 
            `FROM welfare_services AS s ` +
            `JOIN welfare_targets AS t ` + 
            `ON s.service_id = t.service_id ` + 
            `WHERE t.age_group Like '${age_group}' and t.disability_grade Like '${disability_grade}' and t.disability_type Like'${disability_type}' ` +
            `LIMIT ${size} OFFSET ${offset};`;

        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    findAll(keyword='%', size=10, page=1) {
        var offset = (page-1)*size
        var sql = `SELECT * FROM welfare_services WHERE name Like '%${keyword}%' LIMIT ${size} OFFSET ${offset};`;

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