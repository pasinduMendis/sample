const controller = require("../controllers/auth.controller");
const { authValidator } = require("../middlewares");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/auth/signIn", [authValidator.verifySignInParams], controller.signIn)
    app.post("/auth/signUp", [authValidator.verifySignUpParams], controller.signUp)
}