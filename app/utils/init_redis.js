const redisDB = require("redis");
const redistClient = redisDB.createClient();
redistClient.connect();

redistClient.on("connect", () => {
    console.log("connecting to redis..")
})

redistClient.on("error", (err) => {
    console.log("Redis error : ", err.message)
});

redistClient.on("ready", () => {
    console.log("conncted to RedisDB and ready to use...")
});

redistClient.on("end", () => {
    console.log("deisconnected from redis")
});

module.exports = redistClient;