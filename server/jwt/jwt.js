'use strict'

import jwt from "jwt-simple";
import moment from "moment";

const createToken = (user, param) =>{

    if(param){

        const payload = {
            id: user.id,
            username: user.username,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            cre: moment().unix(),
            exp: moment().add(2, "days").unix()
        }
        
        return jwt.encode(payload, process.env.SECRET)
    }

    const payload = {
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        cre: moment().unix(),
        exp: moment().add(5, "days").unix()
    }
    return jwt.encode(payload, process.env.SECRET)
};

export default createToken;