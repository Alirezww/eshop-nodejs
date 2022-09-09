const { HomeController } = require("../../http/controllers/api/home.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const redisClient = require("../../utils/init_redis");

(async() => {
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value)
})()

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *      name: IndexPage
 *      description: index page routes
 */

/**
 * @swagger 
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all needed datas
 *      parameters:
 *          -   name: access-token
 *              description: an access token for auto authentication
 *              in: header
 *              type: string
 *              required: false
 *              example: Bearer YourToken....
 * 
 *      responses:
 *          200:
 *              description : success
 *          404:
 *              description : notFound
 */
router.get("/", verifyAccessToken ,HomeController.indexPage)

module.exports = {
    HomeRoutes : router
};