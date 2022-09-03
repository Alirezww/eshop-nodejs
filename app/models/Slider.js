const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
    title : { type : String, trim : true },
    text : { type : String, trim : true },
    image : { type : String, required : true, trim : true },
    type : { type : String, default : "main" }
})

const SliderModel = mongoose.model("Slider", SliderSchema);

module.exports = SliderModel