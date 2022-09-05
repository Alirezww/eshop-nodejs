module.exports = {
    EXPIRES_IN : new Date().getTime() + 120000,
    USER_ROLE : "USER",
    MONGO_URI : process.env.MONGO_URI,
    SECRET_KEY : process.env.SECRET_KEY
}