const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *      post:
 *          summary: create new category
 *          tags: [Admin-Panel]
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 * 
 *              -   in: formData
 *                  name: parent
 * 
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.post("/add", CategoryController.addCategory)

module.exports = {
    CategoryRoutes : router
}