const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { AllRoutes } = require("./routes/router");
const createError = require("http-errors");

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
        this.#app.use(morgan("dev"));
        this.#app.use(express.json({  }));
        this.#app.use(express.urlencoded({ extended : false }));
        this.#app.use(express.static(path.join(__dirname, "..",  "public")));
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