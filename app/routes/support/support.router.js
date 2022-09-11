const { SupportController } = require("../../http/controllers/support/support.controller");
const { ApiNamespaeRouter } = require("./namespace.router");
const { ApiRoomRouter } = require("./room.router");

const router = require("express").Router();

router.use("/room", ApiRoomRouter);
router.use("/namespace", ApiNamespaeRouter);
router.get("/", SupportController.renderChatRoom);

module.exports = {
    SupportSectionRouter : router
};