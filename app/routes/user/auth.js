const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 * /user/login:
 *      post:
 *          summary: login user in userpanel with phone number
 *          description: one time password (OTP)
 *          parameters:
 *          -   name: mobile
 *              description: IRI-fa phone number
 *              in: formData
 *              type: string
 *              required: true
 *          responses:
 *              201:
 *                  description : success
 *              400:
 *                  description : Bad Request
 *              401:
 *                  description : Unauthorization
 *              500:
 *                  description : Internal Server Error
 */
router.post("/login", UserAuthController.login);

module.exports = {
    userAuthRoutes : router
}