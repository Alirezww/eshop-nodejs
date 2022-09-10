const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      -   name: Admin-Panel
 *          description: actions of admin (add, edit, remove, read)
 *      -   name: Category-AdminPanel
 *          description: manage category (read, delete, update, create)
 */

router.use("/category", CategoryRoutes)

module.exports = {
    AdminRoutes: router
}