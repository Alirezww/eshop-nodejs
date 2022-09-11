const { NamespaceController } = require("../../http/controllers/support/namespace.controller");

const router = require("express").Router();

router.get("/add", NamespaceController.addNemespace);
router.get("/list", NamespaceController.getListOfNamespaces);

module.exports = {
    NamespaceSection : router
};