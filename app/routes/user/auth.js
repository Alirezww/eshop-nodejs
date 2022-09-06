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

/**
 * @swagger
 * /user/check-otp:
 *      post:
 *          tags : [User-Authentication]
 *          summary: check otp value in user controller
 *          description: check otp with code, mobile, expires date
 *          parameters:
 *          -   name: mobile
 *              description: IRI-fa phone number
 *              in: formData
 *              type: string
 *              required: true
 * 
 *          -   name: code
 *              description: enter SMS code recieved
 *              in: formData
 *              type: string
 *              required: true
 * 
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
router.post("/check-otp", UserAuthController.checkOtp);

/**
 * @swagger
 * /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new access and refresh token
 *          description: fresh token
 *          parameters:
 *          -   name: refreshToken
 *              in: formData
 *              required: true
 *              type: string 
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.post("/refresh-token", UserAuthController.refreshToken);


module.exports = {
    userAuthRoutes : router
}