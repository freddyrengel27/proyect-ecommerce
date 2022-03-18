'use strict'
import servidor from "./app.js";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

servidor.listen(process.env.PORT ,() =>{
    console.log("Server listo");
});
