'use strict'
import validator from "validator";
import conn from "../db/database.js";
import moment from "moment";
import history from "./setHistory.js";

const con = await conn(); 

const controllersCarrito = {

    get: async (req, res) =>{
        const {id} = req.user;
        try {
            const sql = "SELECT carrito.*, products.nombre, products.precio, products.urlImage, categorias.categoria FROM carrito INNER JOIN products ON carrito.id_product = products.id INNER JOIN categorias ON products.id_categoria = categorias.id WHERE carrito.id_user = ?";
            const [rows] = await con.execute(sql, [id]);

            return res.status(200).send({
                type: "nice",
                carrito: rows,
                contadorCarrito: rows.length
            });


        } catch (error) {
            
            return res.status(200).send({
                type: "error",
                error,
                message: "error inesperado"
            });
        }


        
    },

    add: async (req, res) =>{

        const {idProduct} = req.body;
        
        const carrito = {
            idUser: req.user.id,
            idProduct,
            fecha: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        
        try {
            let sql = "INSERT INTO carrito(carrito.id_user, carrito.id_product, fecha_carrito) VALUES(?, ?, ?)";
            const response = await con.execute(sql, [carrito.idUser, carrito.idProduct, carrito.fecha]);
            
            history(req.user.id, "Añadio un producto al carrito");
            return res.status(200).send({
                type: "nice",
                message: "Producto añadido con exito"
            });
            
        } catch (error) {
            console.log(error)
            return res.status(200).send({
                type: "error",
                error,
                message: "Error inesperado"
            });
        }
    },

    delete: async (req, res) =>{

        const {id} = req.params;
        try {

            let sql = "DELETE FROM carrito WHERE id_carrito = ?";
            await con.execute(sql, [id]);

            history(req.user.id, "Elimino un producto del carrito");
            return res.status(200).send({
                message: "Producto eliminado del carrito"
            });
            
        } catch (error) {
            
            return res.status(200).send({
                type: "error",
                error,
                message: "Error inesperado"
            });
        }

        
    }

};

export default controllersCarrito;