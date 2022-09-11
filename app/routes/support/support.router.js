const { SupportController } = require("../../http/controllers/support/support.controller");
const { ApiNamespaeRouter } = require("./namespace.router");
const { ApiRoomRouter } = require("./room.router");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      -   name: Support
 *          description: actions of admin (add, edit, remove, read)
 */

router.use("/room", ApiRoomRouter);
router.use("/namespace", ApiNamespaeRouter);
router.get("/", SupportController.renderChatRoom);

module.exports = {
    SupportSectionRouter : router
};