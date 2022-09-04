const createHttpError = require("http-errors");
const { authSchema } = require("../../validators/user/auth");
const Controller = require("../controller");

class HomeController extends Controller {
    async indexPage(req, res, next){
        try{
            console.log("first")
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).send("Index Page Store");
        }catch(error){
            next(createHttpError.BadRequest(error.message));
        }
    };
};

module.exports = {
    HomeController : new HomeController()
}