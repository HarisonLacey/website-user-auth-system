const controller = require("../controller/controller");

module.exports = (app) => {
    app.post("/api/signup", controller.signup);
    app.post("/api/login", controller.login)
    app.get("/api/authenticate", controller.authenticated);
    app.post("/api/submit", controller.emailConfirmation);
    app.post("/api/query", controller.queryChecker);
    app.post("/api/reset", controller.passwordReset);
    app.post("/api/dashboard-reset", controller.dashboardPasswordReset);
    app.get("/api/logout", controller.logout);
    app.get("/api/redirect", controller.redirect);
}