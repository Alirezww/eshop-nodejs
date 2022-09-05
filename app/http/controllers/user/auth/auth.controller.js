const createHttpError = require("http-errors");
const autoBind = require("auto-bind");

const { randomNumberGenerator } = require("../../../../utils/functions");
const UserModel = require("../../../../models/User");
const { authSchema } = require("../../../validators/user/auth");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");

class UserAuthController {

    constructor(){
        autoBind(this)
    }

    async login(req, res, next){
        try{
            await authSchema.validateAsync(req.body);
            const { mobile } = req.body
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile, code);
            if(!result) createHttpError.Unauthorized("ورود شما انجام نشد.")
            return res.status(200).json({
                data : {
                    statusCode : 200,
                    message : "کد اعتبارسنجی با موفقیت برای شما ارسال شد.",
                    code,
                    mobile
                }
            })
        }catch(error){
            next(createHttpError.BadRequest(error.message));
        }
    }

    async saveUser(mobile, code){
        let otp = {
            code,
            expiresIn : EXPIRES_IN
        };

        const result = this.checkExistUser(mobile);

        if(result){
            return (await this.updateUser(mobile, {otp}))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            roles : [USER_ROLE]
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