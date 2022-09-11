const { RoomController } = require("../../http/controllers/support/room.controller");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /support/room/add:
 *      post:
 *          tags: [Support]
 *          summary: add room in namespaces for chatroom
 *          parameters:
*               -    name: name
*                    type: string
*                    in: formData
*                    required: true
*                    description: the title of category
*               
*               -    name: description
*                    type: string
*                    in: formData
*                    required: true
*                    description: the description of text of blog
*               
*               -    name: image
*                    type: file
*                    in: formData
*                    required: true
*                    description: the index picture of blog
*               
*               -    name: namespace
*                    type: string
*                    in: formData
*                    required: true
*                    description: namespace of conversation
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", uploadFile.single("image"), RoomController.addRoom);
router.get("/list", RoomController.getListOfRooms);

module.exports = {
    ApiRoomRouter : router
};