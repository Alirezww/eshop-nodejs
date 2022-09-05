const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      name: User-Authentication
 *      description: authentication section
 */

/**
 * @swagger
 * /user/get-otp:
 *      post:
 *          summary: login user in userpanel with phone number
 *          tags : [User-Authentication]
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
router.post("/get-otp", UserAuthController.getOtp);


module.exports = {
    userAuthRoutes : router
}