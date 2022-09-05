const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/User");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constans");

const randomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}

const SignAccessToken = (userID) => {
    return new Promise(async (resolve, reject) => {

        const user = await UserModel.findById(userID);

        const payload = {
            mobile : user.mobile,
            userID : user._id 
        };
        const secret = SECRET_KEY;
        const options = {
            expiresIn : "1h"
        };

        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createHttpError.InternalServerError("خطای سرور پیش آمده است لطفا دوباره بعدا امتحان کنید."));
            resolve(token)
        })
    })
}

module.exports = {
    randomNumberGenerator,
    SignAccessToken
}