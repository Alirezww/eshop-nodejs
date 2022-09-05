const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name : {type : String , trim : true},
    last_name : {type : String, trim : true},
    username : {type : String , unique : true, trim : true, lowercase : true},
    mobile : {type : String ,  unique : true},
    email : {type : String , lowercase : true, unique : true, trim : true},
    password : {type : String},
    otp : { type : Object, default : {
        code : "",
        expiresIn : 0
    }},
    bills : { type : [], default : [] },
    roles : {type : [String] , default : ["USER"]},
    discount : { type : Number, default : 0 },
    birthday : { type : String },
    last_login : { type : Date }
})


module.exports = {
    UserModel : mongoose.model("user", userSchema)
}