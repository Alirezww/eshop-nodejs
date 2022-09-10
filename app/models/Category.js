const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title : { type : String, required : true, trim : true },
    parent : { type: mongoose.Types.ObjectId, default: undefined, ref: "Category"}
},{
    id: false,
    toJSON: {
        virtuals: true
    }
});

CategorySchema.virtual("children", {
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
});

function autoPopulate(next) {
    this.populate([{path : "children", select : {__v : 0, id : 0}}]);
    next()
}
CategorySchema.pre('findOne', autoPopulate).pre("find", autoPopulate)

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel