const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const expressEjsLayout = require("express-ejs-layouts");

const { AllRoutes } = require("./routes/router");
const { initialSocket } = require("./utils/initSocket");
const { socketHandler } = require("./socket.io");

class Application {
    #app = express();
    #DB_URI;
    #PORT;

    constructor(PORT, DB_URI){
        this.#DB_URI = DB_URI;
        this.#PORT = PORT;
        
        this.configApplication();
        this.initTemplateEngine();
        this.connectToMongoDB();
        this.initRedis();
        this.createRoutes();
        this.errorHandling();
        this.createServer();
    };

    configApplication(){
        this.#app.use(cors())
        this.#app.use(morgan("dev"));
        this.#app.use(express.json({  }));
        this.#app.use(express.urlencoded({ extended : false }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
        
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
            swaggerDefinition : {
                info : {
                    title : "Alireza Store",
                    version : "2.0.0",
                    description : "اولین وبسایت فروش اکانت بازی ها",
                    contact : {
                        name : "Alireza Talebi",
                        email : "alirezatlb45@gmail.com",
                        url : "https://alirezatalbi.com"
                    }
                },
                servers : [
                    {
                       url : "http://localhost:3000" 
                    }
                ],
                components : {
                    securitySchemes : {
                      BearerAuth : {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                        
                      }
                    }
                },
            },
            apis : ["./app/routes/**/*.js"]
        })));
    }

    connectToMongoDB(){
        mongoose.connect(this.#DB_URI, (error) => {
            if(!error) return console.log("MongoDB connected succesfully...");
            return console.log("falied to connect MongoDB");
        })

        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to DB.")
        })

        mongoose.connection.on("disconnected", () => {
            console.log("mongoose disconnected to DB.")
        })

        process.on("SIGINT", async() => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }

    initRedis(){
        require("./utils/init_redis")
    }

    createRoutes(){
        this.#app.use(AllRoutes);
    }

    initTemplateEngine(){
        this.#app.use(expressEjsLayout)
        this.#app.set("view engine", "ejs");
        this.#app.set("views", "resource/views");
        this.#app.set("layout extractStyles", true);
        this.#app.set("layout extractScripts", true);
        this.#app.set("layout", "./layouts/master");
    }

    createServer(){
        const http = require("http");
        const server =  http.createServer(this.#app);
        const io = initialSocket(server);
        socketHandler(io);
        server.listen(this.#PORT, () => {
            console.log(`The server is running on localhost in port ${this.#PORT}`)
        })
    }

    errorHandling(){
        this.#app.use((req, res, next) => {
            next(createError.NotFound("صفحه موردنظر یافت نشد!"))
        });

        this.#app.use((error, req, res, next) => {
            const serverError =createError.InternalServerError();
            const statusCode = error?.status || serverError.status;
            const message = error?.message || serverError.message;

            return res.status(statusCode).json({
                errors : {
                    statusCode,
                    message
                }
            })
        })
    }
};

module.exports = Application;