'use strict'
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import moment from "moment";
import conn from "../db/database.js";
import createToken from "../jwt/jwt.js";

const controllerUser = {

    registration: async (req, res) =>{

        const {nombre, apellido, username, email, password} = req.body;

        let vNombre = !validator.isEmpty(nombre) && validator.isAlpha(nombre);
        let vApellido = !validator.isEmpty(apellido) && validator.isAlpha(apellido);
        let vUsername = !validator.isEmpty(username);
        let vEmail = !validator.isEmpty(email) && validator.isEmail(email);
        let vPassword = !validator.isEmpty(password);
        
        if(!vNombre || !vApellido || !vUsername || !vEmail || !vPassword){
            return res.status(200).send({
                type: "error",
                message: "Eror en los datos indicados"
            });
        }

        const connn = await conn();
        let sqlGetUsename = "SELECT username FROM users WHERE username = ?";
        const resUsername = await connn.execute(sqlGetUsename, [username]);

        if(resUsername[0].length >= 1){
            return res.status(200).send({
                type: "error",
                message: "El nombre de usuario ya existe"
            })
        }
        let sqlGetEmail = "SELECT email FROM users WHERE email = ?";
        const resEmail = await connn.execute(sqlGetEmail, [email]);

        if(resEmail[0].length >= 1){
            return res.status(200).send({
                type: "error",
                message: "El email ya esta en uso"
            })
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(password, salt);

       try{
        let sqlRegistro = "INSERT INTO users(nombre, apellido, username, email, password) VALUES(?, ?, ?, ?, ?)";
        const registro = await connn.execute(sqlRegistro, [nombre, apellido, username, email, hash]);
        return res.status(200).send({
            type: "nice",
            message: "Registro exitoso"
        })

       }catch(err){
            return res.status(200).send({
                type: "error",
                message: "Error no se pudo registrar",
                err
            })
       }
        
    },

    login: async (req, res) =>{

        const {username, password} = req.body;
        let vUsername = !validator.isEmpty(username);
        let vPassword = !validator.isEmpty(password);

        if(!vUsername || !vPassword){

            return res.status(200).send({
                type: "error",
                message: "Datos invalidos",
            })
        }

        const con = await conn();

        let sql = "SELECT * FROM users WHERE username = ?";
        const [rows, fields] = await con.execute(sql, [username]);

        if(rows.length < 1){
            
            return res.status(200).send({
                type: "error",
                message: "Nombre de usuario no encontrado"
            });
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password)


        if(!match){

            return res.status(200).send({
                type: "error",
                message: "Error en los datos insertados"
            });
        }

        return res.status(200).send({
            type: "type",
            message: "Login exitoso",
            token: createToken(user)
        });
    },


    decode: (req, res) =>{
        const {token} = req.body

        const info = jwt.decode(token, process.env.SECRET);
        try{
        if(info.exp <= moment().unix()){

            return res.status(200).send({
                type: "exp",
                message: "El token a expirado",
                info: {id: info.id, username: info.username}
            });
        }

        return res.status(200).send({
            type: "nice",
            info
        });

    }catch{

        return res.status(200).send({
            type: "exp",
            message: "El token a expirado"
        });
    }

    }
};

export default controllerUser;