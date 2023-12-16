const controller = require("../controllers/blog.controller");
const { jwtValidator } = require("../middlewares");
const blogValidator = require("../middlewares/blog.validator");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/blog/create", [blogValidator.blogValidatorParams,jwtValidator.verifyToken], controller.createBlog)
    app.post("/blog/getAllBlogs",controller.getBlog)
    app.post("/blog/getSingleBlog",controller.getBlogSingal)

}   