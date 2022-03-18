'use strict'
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import {createServer} from "http";
import {Server} from "socket.io";
import autoComplete from "./controllers/autoBuscador.js";

import routes from "./routes/routes.js";


const app = Express();

const servidor = createServer(app);

app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/system", routes)

const io = new Server(servidor);

io.on("connection", (socket) =>{
    socket.on("prueva", async msg =>{
        if(msg.length > 0){
            const auto = await autoComplete(msg);
            socket.emit("autoRes", auto);
        }
        
    })
});


export default servidor;