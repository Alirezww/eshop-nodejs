const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      name: Admin-Panel
 *      description: actions of admin (add, edit, remove, read)
 */

router.use("/category", CategoryRoutes)

module.exports = {
    AdminRoutes: router
}