const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({

})

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel