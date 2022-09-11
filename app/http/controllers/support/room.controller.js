const Controller = require("./../controller");
const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../models/conversation");
const path = require("path");

class RoomController extends Controller{
    async addRoom(req, res, next){
        try{
            const { name, description, filename, fileUploadPath, namespace } = req.body;

            await this.findNamespaceByEndpoint(namespace)
            await this.findRoomByName(name);

            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const room = { image, name, description };

            const conversation = await ConversationModel.updateOne({ endpoint: namespace }, { 
                $push: { rooms : room }
            });

            if(!conversation) throw createHttpError.InternalServerError("خطایی سمت سرور رخ داده است. لطفا بعدا امتحان کنید.");
            return res.status(200).json({
                statusCode: 200,
                data: {
                    message: "فضای مکالمه جدیدی با موفقیت ایجاد شده است."
                }
            });
        }catch(err){
            next(err);
        }
    };

    async getListOfRooms(req, res, next){
        try{
            const conversation = await ConversationModel.find({}, { rooms:1 });
            if(!conversation) throw createHttpError.InternalServerError("خطایی سمت سرور رخ داده است.");
            return res.status(200).json({
                statusCode: 200,
                data:{
                    rooms: conversation.rooms
                }
            })
        }catch(err){
            next(err);
        }
    }

    async findRoomByName(name){
        const room = await ConversationModel.findOne({ "rooms.name" : name });
        if(!room) throw createHttpError.BadRequest("این نام قبلا استفاده شده است.");
    }
    
    async findNamespaceByEndpoint(endpoint){
        const namespace = await ConversationModel.findOne({ endpoint });
        if(namespace) throw createHttpError.BadRequest("فضای مکالمه ای یافت نشد!");
        return namespace;
    }
}

module.exports = {
    RoomController : new RoomController()
}