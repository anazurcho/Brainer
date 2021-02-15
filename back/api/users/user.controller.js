const { create, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(6);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DB Connection Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: 'created succesfully'
            })
        })
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })
    },
    login: (req, res) => {
        const body = req.body;

        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JSONTOKEN, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }

        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    // updateUser: (req, res) => {
    //     const body = req.body;
    //     const salt = genSaltSync(6);
    //     body.password = hashSync(body.password, salt);
    //     updateUser(body, (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         if (result == 0) {
    //             return res.json({
    //                 success: 0,
    //                 message: "faled to update"
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             message: "updated succesfully"
    //         })
    //     })
    // },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results == 0) {
                return res.json({
                    success: 0,
                    message: "Record Not Found",
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully",
            });

        })
    }

}