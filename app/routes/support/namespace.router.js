const { NamespaceController } = require("../../http/controllers/support/namespace.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /support/namespace/add:
 *      post:
 *          tags: [Support]
 *          summary: add room in namespaces for chatroom
 *          parameters:
*               -    name: title
*                    type: string
*                    in: formData
*                    required: true
*                    description: the title of namespace
*               
*               -    name: endpoint
*                    type: string
*                    in: formData
*                    required: true
*                    description: the description of text of namespace
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", NamespaceController.addNemespace);
router.get("/list", NamespaceController.getListOfNamespaces);

module.exports = {
    ApiNamespaeRouter : router
};