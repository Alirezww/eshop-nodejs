const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/User");
const { ACCESS_TOKEN_SECRET_KEY, REFREST_TOKEN_SECRET_KEY } = require("./constans");

const randomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}

const SignAccessToken = (userID) => {
    return new Promise(async (resolve, reject) => {

        const user = await UserModel.findById(userID);

        const payload = {
            mobile : user.mobile
        };
        const secret = ACCESS_TOKEN_SECRET_KEY;
        const options = {
            expiresIn : "1h"
        };

        JWT.sign(payload, secret, options, (err, token) => {
            if(err) reject(createHttpError.InternalServerError("خطای سرور پیش آمده است لطفا دوباره بعدا امتحان کنید."));
            resolve(token)
        })
    })
}

const SignRefreshToken = (userID) => {
    return new Promise(async (resolve, reject) => {

        const user = await UserModel.findById(userID);

        const payload = {
            mobile : user.mobile
        };
        const secret = REFREST_TOKEN_SECRET_KEY;
        const options = {
            expiresIn : "1y"
        };

        JWT.sign(payload, secret, options, (err, token) => {
            if(err) reject(createHttpError.InternalServerError("خطای سرور پیش آمده است لطفا دوباره بعدا امتحان کنید."));
            resolve(token)
        })
    })
}

const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFREST_TOKEN_SECRET_KEY, async(err, payload) => {
            if(err) reject(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید."));
    
            const { mobile } = payload  || {};
            const user = await UserModel.findOne({ mobile });
            if(!user) reject(createHttpError.Unauthorized("حساب کاربری موردنظر پیدا نشد."));
            
            resolve(mobile)
        }) 
    })   
};

module.exports = {
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    verifyRefreshToken
}