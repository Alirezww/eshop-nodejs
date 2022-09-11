const { NamespaceController } = require("../../http/controllers/support/namespace.controller");

const router = require("express").Router();

router.post("/add", NamespaceController.addNemespace);
router.get("/list", NamespaceController.getListOfNamespaces);

module.exports = {
    ApiNamespaeRouter : router
};