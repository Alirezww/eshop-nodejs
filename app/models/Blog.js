const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    title : { type : String, required : true, trim : true },
    image : { type : String, required : true, trim : true },
    tags : { type : [String], default : []},
    category : { type : mongoose.Types.ObjectId, required : true },
    comments : { type : [], default : [] },
    likes : { type : [mongoose.Types.ObjectId], default : []},
    dislikes : { type : [mongoose.Types.ObjectId], default : []},
    bookmark : { type : [mongoose.Types.ObjectId], default : []}
})

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel