const Joi = require("@hapi/joi");

const addCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد.")),
    parent: Joi.string().allow("").allow('').error(new Error("شناسه ارسال شده صحیح نمی باشد."))
});

module.exports = {
    addCategorySchema,
}