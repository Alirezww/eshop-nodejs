const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/User");

const randomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}

module.exports = {
    randomNumberGenerator,
}