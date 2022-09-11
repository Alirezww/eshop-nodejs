const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../models/conversation");
const Controller = require("./../controller");

class NamespaceController extends Controller{

    async addNemespace(req, res, next){
        try{
            const { title, endpoint } = req.body;
            const conversation = await ConversationModel.create({ title, endpoint });
            if(!conversation) throw createHttpError.InternalServerError("خطایی سمت سرور رخ داده است. لطفا بعدا امتحان کنید.");
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "فضای نام جدیدی با موفقیت ایجاد شده است."
                }
            });
        }catch(err){
            next(err);
        }
    }

}

module.exports = {
    NamespaceController : new NamespaceController()
}