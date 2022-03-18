'use strict'
import jwt from "jwt-simple";
import moment from "moment";

const middleware = (req, res, next) =>{

    if(!req.headers.authorization){

        return res.status(200).send({
            type: "error",
            message: "Falta la autorizacion"
        });
    };

    const token = req.headers.authorization.replace(/['"]+/g, "");

    const payload = jwt.decode(token, process.env.SECRET);

    if(payload.exp <= moment().unix){
        
        return res.status(200).send({
            type: "error",
            message: "Token de autorizacion expirado"
        });
    }

    req.user = payload;

    next();

};

export default middleware;