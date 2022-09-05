const Application = require("./app/server");
const dotenv = require("dotenv");

dotenv.config();
new Application(3000, process.env.MONGO_URI);