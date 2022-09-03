const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title : { type : String, required : true, trim : true },
    short_desc : { type : String, required : true, trim : true },
    desc : { type : String, required : true, trim : true },
    images : { type : [String], required : true },
    tags : { type : [String], default : []},
    category : { type : mongoose.Types.ObjectId, required : true },
    comments : { type : [], default : [] },
    likes : { type : [mongoose.Types.ObjectId], default : []},
    dislikes : { type : [mongoose.Types.ObjectId], default : []},
    bookmark : { type : [mongoose.Types.ObjectId], default : []},
    price : { type : Number, default : 0 },
    discount : { type : Number, default : 0 },
    count : { type : Number },
    type : { type : String, required : true },
    time : { type : String },
    format : { type : String },
    teacher : { type : mongoose.Types.ObjectId },
    feture : { type : Object, default : {
        heigth : "",
        width : "",
        length : "",
        weigth : "",
        colors : [],
        model : [],
        madein : ""
    }},
})

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel