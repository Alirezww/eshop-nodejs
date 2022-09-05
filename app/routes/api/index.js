const { HomeController } = require("../../http/controllers/api/home.controller");

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
 *      responses:
 *          200:
 *              description : success
 *          404:
 *              description : notFound
 */
router.get("/", HomeController.indexPage)

module.exports = {
    HomeRoutes : router
};