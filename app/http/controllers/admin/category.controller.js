const Controller = require("../controller");
const CategoryModel = require("../../../models/Category");
const createHttpError = require("http-errors");
const { addCategorySchema } = require("../../validators/admin/category.schema");

class CategoryController extends Controller {
    async addCategory(req, res, next){
        try{
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;

            const category = await CategoryModel.create({ title, parent });
            if(!category) throw createHttpError.InternalServerError("خطای سروری رخ داده است.");

            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: "دسته بندی با موفقیت افزوده شد."
                }
            })
        }catch(err){
            next(err);
        };
    }

    async removeCategory(req, res, next){
        try{
            
        }catch(err){
            next(err);
        };
    }
 
    async editCategory(req, res, next){
        try{
            
        }catch(err){
            next(err);
        };
    }

    async getAllCategory(req, res, next){
        try{
            
        }catch(err){
            next(err);
        };
    }

    async getCategoryByID(req, res, next){
        try{
            
        }catch(err){
            next(err);
        };
    }

    async getAllParents(req, res, next){
        try{
            const parents = await CategoryModel.find({ parent : undefined }, { __v: 0 });

            return res.status(200).json({
                data:{
                    parents
                }
            })
        }catch(err){
            next(err);
        };
    }

    async getChildOfParents(req, res, next){
        try{
            const { parent } = req.params;

            const children = await CategoryModel.find({ parent }, { __v: 0, parent : 0 });

            return res.status(200).json({
                data: {
                    children
                }
            })
        }catch(err){
            next(err);
        };
    }
};

module.exports = {
    CategoryController : new CategoryController()
}