const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name : {type : String , trim : true},
    last_name : {type : String, trim : true},
    username : {type : String , required : true, unique : true, trim : true},
    mobile : {type : String , required : true, unique : true},
    email : {type : String , required : true, unique : true, trim : true},
    password : {type : String , required : true},
    otp : { type : Object, default : {
        code : "",
        expires : 0
    }},
    bills : { type : [], default : [] },
    roles : {type : [String] , default : ["USER"]},
    discount : { type : Number, default : 0 },
    birthday : { type : String },
    last_login : { type : Date }
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel