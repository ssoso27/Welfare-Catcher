
module.exports = class AccountRepository {

    constructor(db) {
        this.db = db;
    }

    findAll() {
        var sql = "SELECT * FROM accounts;"
        
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                // console.log(result)
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    create(values) {
        var sql = 
        `INSERT INTO accounts
            (nickname, profile_img, email, kakao_id, password, age_group, disability_type, disability_grade, salt, createdAt, updatedAt)
        VALUES(
            ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()
        );`
        var params = [ values.nickname
            , values.profile_img
            , values.email
            , values.kakao_id
            , values.password
            , values.age_group
            , values.disability_type
            , values.disability_grade
            , values.salt
        ]

        return new Promise((resolve, reject) => {

            this.db.query(sql, params)
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error);
                });
        })
    }

    findByEmail(email) {
        var sql = "SELECT * FROM accounts WHERE email=?;"
        var params = [email]

        return new Promise((resolve, reject) => {
            this.db.query(sql, params)
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        });
    }
}