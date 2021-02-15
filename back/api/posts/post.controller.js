const { create, getPosts, getPostByPostId, updatePost, deletePost } = require('./post.service');


module.exports = {
    createPost: (req, res) => {
        const body = req.body;
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
    getPostByPostId: (req, res) => {
        const id = req.params.id;
        getPostByPostId(id, (err, results) => {
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
    getPosts: (req, res) => {
        getPosts((err, results) => {
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
    updatePost: (req, res) => {
        const body = req.body;
        updatePost(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
    
            return res.status(200).json({
                success: 1,
                message: "updated succesfully",
                data: results
            })
        })
    },
   
    deletePost: (req, res) => {
        const data = req.body;
        deletePost(data, (err, results) => {
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
                message: "Post deleted successfully",
            });

        })
    }

}