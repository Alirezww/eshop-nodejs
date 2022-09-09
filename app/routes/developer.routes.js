const router = require("express").Router();
const bcrypt = require("bcrypt"); 

router.get("/password-hash/:password", (req, res, next) => {
    const password = req.params.password;
    const salt = bcrypt.genSaltSync(8);
    return res.send(bcrypt.hashSync(password, salt));
})

module.exports = {
    DeveloperRoutes : router
}