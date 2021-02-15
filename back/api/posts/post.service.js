const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into Posts (name) values (?)`,
            [
                data.name,
            ],
            (error, results, fields) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getPosts: callBack => {
        pool.query(
            `select id, name from Posts`, [],
            (error, results, fields) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getPostByPostId: (id, callBack) => {
        pool.query(
            `select id, name from Posts where id = ?`,
            [id],
            (error, results, fields) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    updatePost: (data, callBack) => {
        pool.query(
            `update Posts set name = ? where id = ?`,
            [
                data.name,
                data.id
            ],
            (error, results, fields) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deletePost: (data, callBack) => {
        pool.query(
            `delete from Posts where id = ?`,
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
