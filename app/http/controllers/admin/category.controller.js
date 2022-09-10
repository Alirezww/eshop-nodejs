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
            const { id } = req.params
            const category = await this.checkExistsCategory(id);

            const deleteResult = await CategoryModel.deleteOne({ _id : category._id });
            if(deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("خطای سروری هنگام حذف دسته بندی مورد نظر رخ داد!");

            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "دسته بندی موردنظر با موفقیت حذف گردید."
                }
            })
        }catch(err){
            next(err);
        };
    }

    async checkExistsCategory(id){
        const category =  await CategoryModel.findById(id);
        if(!category) throw createHttpError.NotFound("دسته بندی موردنظر برای حذف کردن پیدا نشد.");
        return category;
    }
 
    async editCategory(req, res, next){
        try{
            
        }catch(err){
            next(err);
        };
    }

    async getAllCategories(req, res, next){
        try{
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $lookup : {
            //             from: "categories",
            //             localField: "_id",
            //             foreignField: "parent",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project : { 
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent" : 0
            //         }
            //     },
            //     {
            //         $match : {
            //             parent : undefined
            //         }
            //     }
            // ]);

            const categories = await CategoryModel.aggregate([
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "children"
                    }
                },
                {
                    $project : { 
                        __v: 0,
                        "children.__v": 0,
                        "children.parent" : 0
                    }
                },
                {
                    $match: {
                        parent: undefined
                    }
                }
            ])

            return res.status(200).json({
                data: {
                    categories
                }
            })
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