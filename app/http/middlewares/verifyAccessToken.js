const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/User");

const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

const verifyAccessToken = (req, res, next) => {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"].split(" ") || [];

    if(token && ["Bearer", "bearer"].includes(bearer)){

        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async(err, payload) => {
            if(err) return next(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید."));

            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password:0, otp:0 } );
            if(!user) return next(createHttpError.Unauthorized("حساب کاربری موردنظر پیدا نشد."));

            req.user = user;
            req.isAuthenticated = true;

            return next()
        })
    }
    else return next(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید."))
    
};

module.exports = {
    verifyAccessToken
}