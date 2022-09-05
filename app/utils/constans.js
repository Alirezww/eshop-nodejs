module.exports = {
    EXPIRES_IN : new Date().getTime() + 120000,
    USER_ROLE : "USER",
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET_KEY : process.env.ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_SECRET_KEY : process.env.ACCESS_TOKEN_SECRET_KEY
}