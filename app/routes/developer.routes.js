const router = require("express").Router();
const bcrypt = require("bcrypt");

/**
 * @swagger
 * tags:
 *      name: DeveloperRoutes
 *      description: developer utils
 */

/**
 * @swagger
 * /developer/password-hash/(password):
 *      get:
 *          tags: [DeveloperRoutes]
 *          summary: hash data with bcrypt
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true    
 *          responses:
 *              200:
 *                  description: success   
 */       

router.get("/password-hash/:password", (req, res, next) => {
    const password = req.params.password;
    const salt = bcrypt.genSaltSync(8);
    return res.send(bcrypt.hashSync(password, salt));
})

module.exports = {
    DeveloperRoutes : router
}