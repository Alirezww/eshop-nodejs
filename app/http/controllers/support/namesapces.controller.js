const Controller = require("./../controller");

class NameSpaceController extends Controller{
    addNemeSpace(req, res, next){
        try{

        }catch(err){
            next(err);
        }
    }
}

module.exports = {
    NameSpaceController : new NameSpaceController()
}