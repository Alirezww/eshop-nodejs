const createHttpError = require("http-errors");
const autoBind = require("auto-bind");

const { randomNumberGenerator, SignAccessToken, verifyRefreshToken, SignRefreshToken } = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/User");
const { checkOtpSchema, getOtpSchema } = require("../../../validators/user/auth");
const { ROLES } = require("../../../../utils/constans");

class UserAuthController {

    constructor(){
        autoBind(this)
    }

    async getOtp(req, res, next){
        try{
            await getOtpSchema.validateAsync(req.body);
            const { mobile } = req.body
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile, code);

            if(!result) throw createHttpError.Unauthorized("ورود شما انجام نشد.")
            return res.status(200).json({
                data : {
                    statusCode : 200,
                    message : "کد اعتبارسنجی با موفقیت برای شما ارسال شد.",
                    code,
                    mobile
                }
            })
        }catch(error){
            next(error);
        }
    }

    async checkOtp(req, res, next){
        try{
            await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = req.body;

            const user = await UserModel.findOne({ mobile });
            if(!user) throw createHttpError.NotFound("کاربر یافت نشد!!");
            if(user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد.");
            const now = (new Date()).getTime();
            if (+user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است");

            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);

            return res.status(200).json({
                data : {
                    accessToken,
                    refreshToken
                }
            })

        }catch(err){
            next(err)
        }
    }

    async refreshToken(req, res, next){
        try{
            const { refreshToken } = req.body;
            const mobile = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({ mobile });
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);

            return res.json({
                data:{
                    accessToken,
                    refreshToken : newRefreshToken
                }
            })

        }catch(err){
            next(err);
        }
    }

    async saveUser(mobile, code){
        let otp = {
            code,
            expiresIn : (new Date().getTime() + 120000)
        };

        const result = await this.checkExistUser(mobile);
        if(result){
            return (await this.updateUser(mobile, {otp}))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            roles : [ROLES.USER]
        }))

    }

    async checkExistUser(mobile){
        const user = await UserModel.findOne({ mobile });
        return !!user
    }

    async updateUser(mobile, objectData= {}){
        Object.keys(objectData).forEach(key => {
            if([NaN, null, undefined, 0, "0", "" ," "].includes(objectData[key])) delete objectData[key]
        });

        const updateResult = await UserModel.updateOne({ mobile }, { $set : objectData });
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController : new UserAuthController()
}