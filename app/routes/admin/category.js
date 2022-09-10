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
router.post("/add", CategoryController.addCategory);

/**
 * @swagger
 * /admin/category/parents:
 *      get:
 *          summary: get all parent categories
 *          tags: [Admin-Panel]
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.get("/parents", CategoryController.getAllParents);

/**
 * @swagger
 * /admin/category/children/{parent}:
 *      get:
 *          summary: get all childs of parent category
 *          tags: [Admin-Panel]
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
 router.get("/children/:parent", CategoryController.getChildOfParents);

module.exports = {
    CategoryRoutes : router
}