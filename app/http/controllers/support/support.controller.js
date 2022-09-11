const Controller = require("../controller");

class SupportController extends Controller{
    renderChatRoom(req, res, next){
        try{
            return res.render("chat.ejs")
        }catch(err){
            next(err);
        }
    }
};

module.exports = {
    SupportController : new SupportController()
};