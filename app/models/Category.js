const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title : { type : String, required : true, trim : true },
    parent : { type: mongoose.Types.ObjectId, default: undefined }
})

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel