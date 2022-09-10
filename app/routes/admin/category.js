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
 * /admin/category/all:
 *      get:
 *          summary: get all categories
 *          tags: [Admin-Panel]
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.get("/all", CategoryController.getAllCategories);

/**
 * @swagger
 * /admin/category/list-all:
 *      get:
 *          summary: get all categories without population and nested distructure
 *          tags: [Admin-Panel]
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.get("/list-all", CategoryController.getAllCategoriesWithoutPopulation);

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

 /**
 * @swagger
 * /admin/category/remove/{id}:
 *      delete:
 *          summary: remove category by id
 *          tags: [Admin-Panel]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.delete("/remove/:id", CategoryController.removeCategory);

 /**
 * @swagger
 * /admin/category/update/{id}:
 *      patch:
 *          summary: update category title field by id
 *          tags: [Admin-Panel]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 * 
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.patch("/update/:id", CategoryController.editCategory);

/**
 * @swagger
 * /admin/category/{id}:
 *      get:
 *          summary: get category by id
 *          tags: [Admin-Panel]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */
router.get("/:id", CategoryController.getCategoryByID);

module.exports = {
    CategoryRoutes : router
}