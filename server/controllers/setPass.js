'use strict'
import conn from "../db/database.js";
import validator from "validator";
import createToken from "../jwt/jwt.js";
import transporter from "../configs/mailConfig.js";
import jwt from "jwt-simple";
import moment from "moment";
import bcrypt from "bcrypt";
import htmlOput from "../templatesMail/mailPass.js";

const con = await conn();

const controllerSetPass = {

    recovery: async (req, res) =>{
        const {email} = req.body;
        
        let vEmail = !validator.isEmpty(email) && validator.isEmail(email);

        if(!vEmail){

            return res.status(200).send({
                type: "error",
                message: "datos invalidos"
            });
        }

        try {
            let sql = "SELECT * FROM users WHERE email = ?"
            const [rows] = await con.execute(sql, [email]);
            
            if(rows.length == 0){
                return res.status(200).send({
                    type: "error",
                    message: "El correo no corresponde a ningun usuario"
                });
            }
            
            let user = rows[0];
            const token = createToken(user, true);
             const mailOptions = {
                from: "CloneComerse <soldado2727@gmail.com>",
                to: "freddy27rengel@gmail.com",
                subject: "Enviado desde la api",
                html: htmlOput(token)
             };

        

            await transporter.sendMail(mailOptions);


            return res.status(200).send({
                type: "nice",
                message: "Correo enviado"
            });
            
        } catch (error) {
            console.log(error)
            return res.status(200).send({
                type: "error",
                message: "error inesperado",
                error,
            });
        }

    },

    getRecovery: (req, res) =>{

        const {id} = req.params;

        try{ 

            const info = jwt.decode(id, process.env.SECRET);

            if(info.exp <= moment().unix()){

                return res.status(200).send({
                    type: "exp",
                    message: "El tiempo a expirado"
                });
            }

            return res.status(200).send({
                type: "nice",
                info
            });


        } catch (error) {
            console.log(error)
            return res.status(200).send({
                type: "error",
                message: "Tiempo expirado",
                error
            });
            
        }

    },

    setRecovery: async (req, res) =>{

        const {password, id} = req.body;

        let vPass = !validator.isEmpty(password);

        if(!vPass){

            return res.status(200).send({
                type:"error",
                message: "Datos invalidos"
            });
        }

        try {

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = await bcrypt.hashSync(password, salt);

            let sql = "UPDATE users SET password = ? WHERE id = ?";
            await con.execute(sql, [hash, id]);

            return res.status(200).send({
                type: "nice",
                message: "Cambio completado"
            });
            
        } catch (error) {

            return res.status(200).send({
                type: "error",
                message: "error inesperado",
                error
            });
            
        }
    }

};

export default controllerSetPass;