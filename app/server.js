const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");

const { AllRoutes } = require("./routes/router");

class Application {
    #app = express();
    #DB_URI;
    #PORT;

    constructor(PORT, DB_URI){
        this.#DB_URI = DB_URI;
        this.#PORT = PORT;
        
        this.configApplication();
        this.connectToMongoDB();
        this.createRoutes();
        this.errorHandling();
        this.createServer();
    };

    configApplication(){
        this.#app.use(cors())
        this.#app.use(morgan("dev"));
        this.#app.use(express.json({  }));
        this.#app.use(express.urlencoded({ extended : false }));
        this.#app.use(express.static(path.join(__dirname, "..",  "public")));

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

    createRoutes(){
        this.#app.use(AllRoutes);
    }

    createServer(){
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT, () => {
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