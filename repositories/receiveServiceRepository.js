
module.exports = class ReceiveServiceRepository {

    constructor(db) {
        this.db = db;
    }

    find(params) {
        console.log(params)
        var sql = `SELECT * FROM receive_welfares WHERE account_id=${params.accountId} and service_id=${params.serviceId};`;
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

    create(params) {
        var sql = `INSERT INTO receive_welfares 
                        (account_id, service_id, createdAt, updatedAt)
                    VALUES (?, ?, NOW(), NOW())`;

        var values = [
            params.accountId,
            params.serviceId
        ]

        return new Promise((resolve, reject) => {
            this.db.query(sql, values)
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error);
                });
        });
    }

    delete(params) {
        var sql = `DELETE FROM receive_welfares 
                        WHERE account_id=${params.accountId} and service_id=${params.serviceId};` 

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