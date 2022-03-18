'use strict'

import validator from "validator";
import moment from "moment";

import conn from "../db/database.js";

const con = await conn();

const controllersComments = {

    getComments: async (req, res) =>{

        const {id} = req.params;

        const comentario = id.split("-");

        try{

            let sql = "SELECT comments.*, users.nombre, users.apellido, users.username FROM comments, users WHERE(comments.id_product = ? AND comments.id_user = users.id)";
            const [rows] = await con.execute(sql, [comentario[1]]);

            return res.status(200).send({
                type: "nice",   
                comentarios: rows
            });

        }catch(error){
            console.log(error)
            return res.status(200).send({
                type: "error",
                message: error
            })
        }

    },

    add: async (req, res) =>{

        const {comentario, id_product} = req.body;

        let vComentario = !validator.isEmpty(comentario);

        if(!vComentario){

            return res.status(200).send({
                type: "error",
                message: "Datos invalidos"
            });
        }

        const comment = {
            comentario,
            fecha: moment().format("YYYY/MM/DD"),
            hora: moment().format("HH:mm:ss"),
            id_product,
            id_user : req.user.id
        };

        try {
            let sqlInsert = "INSERT INTO comments(comment, hora_comment, fecha_comment, id_product, id_user) VALUES(?, ?, ?, ?, ?)";
            const result = await con.execute(sqlInsert, [comment.comentario, comment.hora, comment.fecha, comment.id_product, comment.id_user]);
        
            return res.status(200).send({
                type: "nice",
                message: "Comentario añadido"
            });

        } catch (error) {
            return res.status(200).send({
                type: "error",
                message: error
            });
        }
        
    },

    update: async (req, res) =>{

        const {id_comment, comentario} = req.body;

        let vComentario = !validator.isEmpty(comentario);

        if(!vComentario){

            return res.status(200).send({
                type: "error",
                message: "Error en el campo"
            });
        }

        try {

            let sqlUpdate = "UPDATE comments SET comment = ? WHERE id_comment = ?";
            const result = await con.execute(sqlUpdate, [comentario, id_comment]);
            
            return res.status(200).send({
                type: "nice",
                message: "comentario cambiado con exito"
            });

        } catch (error) {
            console.log(error)
            
            return res.status(200).send({
                type: "error",
                message: error
            });
        }

    },

    delete: async (req, res) =>{

        const id = req.params.id;

        try {

            let sqlDelete = "DELETE FROM comments WHERE id_comment = ?";
            const result = await con.execute(sqlDelete, [id]);

            return res.status(200).send({
                type: "nice",
                message: "comentario eliminado"
            });
            
        } catch (error) {
            return res.status(200).send({
                type: "error",
                message: error
            });   
        }
    }
};

export default controllersComments;