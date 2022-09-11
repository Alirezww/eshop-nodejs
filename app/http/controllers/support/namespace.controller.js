const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../models/conversation");
const Controller = require("../controller");

class NamespaceController extends Controller{

    async addNemespace(req, res, next){
        try{
            const { title, endpoint } = req.body;
            const conversation = await ConversationModel.create({ title, endpoint });
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

    async getListOfNamespaces(req, res, next){
        try{
            const namespaces = await ConversationModel.find({}, { rooms:0 });
            if(!namespaces) throw createHttpError.InternalServerError("خطایی سمت سرور رخ داده است.");
            return res.status(200).json({
                statusCode: 200,
                data:{
                    namespaces
                }
            })
        }catch(err){
            next(err);
        }
    }

}

module.exports = {
    NamespaceController : new NamespaceController()
}