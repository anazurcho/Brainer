const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into Users (name, email, password) values (?,?,?)`,
            [
                data.name,
                data.email,
                data.password
            ],
            (error, results, fields) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUsers: callBack => {
        pool.query(
            `select id, name, email from Users`, [],
            (error, results, fields) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id, name, email from Users where id = ?`,
            [id],
            (error, results, fields) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from Users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update Users set name=?, email=?, password=? where id = ?`,
            [
                data.name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                // console.log(results)
                // OkPacket {
                //     fieldCount: 0,
                //     affectedRows: 1,
                //     insertId: 0,
                //     serverStatus: 2,
                //     warningCount: 0,
                //     message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                //     protocol41: true,
                //     changedRows: 1
                //   }
                return callBack(null, results[0]);
                
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from Users where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log("შედეგი -", results['affectedRows'])
                return callBack(null, results['affectedRows']);
            }
        );
    }
};