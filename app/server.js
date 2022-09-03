const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./routes/router");

class Application {
    #app = express();
    #DB_URI;
    #PORT
    constructor(PORT, DB_URI){
        this.#DB_URI = DB_URI;
        this.#PORT = PORT;
        
        this.configApplication();
        this.connectToMongoDB();
        this.createRoutes();
        this.errorHandling();
        this.createServer();
    }

    configApplication(){
        this.#app.use(express.json({  }));
        this.#app.use(express.urlencoded({ extended : false }));
        this.#app.use(express.static(path.join(__dirname, "..",  "public")))
    }

    connectToMongoDB(){
        mongoose.connect(this.#DB_URI, (error) => {
            if(!error) return console.log("MongoDB connected succesfully...");
            return console.log("falied to connect MongoDB");
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
            return res.status(404).json({
                status : 404,
                success : false,
                message : "صفحه مورد نظر پیدا نشد."
            });
        });

        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "InternalServerError";

            return res.status(status).json({
                status,
                success : false,
                message
            })
        })
    }
};

module.exports = Application;