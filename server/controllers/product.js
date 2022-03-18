'use strict'
import validator from "validator";
import moment from "moment";
import fs from "fs-extra";
import uploadCloud from "../cloud/cloudinary.js";
import conn from "../db/database.js";

const con = await conn();

const controllersProduct = {

    add: async (req, res) =>{
        const {producto, categoria, descripcion, precio} = req.body;

        let vProducto = !validator.isEmpty(producto);
        let vDescription = !validator.isEmpty(descripcion);

        if(!vProducto || !vDescription){

            return res.status(200).send({
                type: "error",
                message: "Datos suministrados invalidos"
            });
        }
 
        const product = {
            producto,
            categoria,
            descripcion,
            precio,
            fecha: moment().format("YYYY/MM/DD"),
            hora: moment().format("HH:mm:ss"),
            user: req.user.id
        }
        try {
            let sqlRegistro = "INSERT INTO products(nombre, id_categoria, descripcion, precio, urlImage, fecha, hora, id_user) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
            const registro = await con.execute(sqlRegistro, [product.producto, product.categoria, product.descripcion, product.precio, null, product.fecha, product.hora, product.user]); 
        
            const idProduct = registro[0].insertId;
            history(req.user.id, "Subio a la tienda " + product.producto);
            return res.status(200).send({
                type: "nice",
                message: "Se subio el preducto con exito",
                idProduct
            });

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: error
            });
        }
        
    },

    imgeProduct : async (req, res) =>{

        const id = req.params.id;

        try {
            
            const result = await uploadCloud(req.file.path)
            let sql = "UPDATE products set urlImage = ? WHERE id = ?";
            await con.execute(sql, [result.url, id])
            await fs.unlink(req.file.path);

            return res.status(200).send({
                type: "nice",
                message: "imagen subida"
            });

        } catch (error) {
            
            return res.status(200).send({
                type: "error",
                message: error
            });
        }


    },


    update: async (req, res) =>{

        console.log(req.body)
        const {id, producto, categoria, descripcion, precio,} = req.body;

        let vProducto = !validator.isEmpty(producto);
        let vCategoria = !validator.isEmpty(categoria);
        let vDescricion = !validator.isEmpty(descripcion);
        let vPrecio = !validator.isEmpty(precio)

        if(!vProducto || !vCategoria || !vDescricion || !vPrecio){

            return res.status(200).send({
                type: error,
                message: "Datos invalidos"
            });
        }
        try{

            let sqlUpdate = "UPDATE products SET nombre = ?, id_categoria = ?, descripcion = ?, precio = ? WHERE id = ?";
            const result = await con.execute(sqlUpdate, [producto, categoria, descripcion, precio, id]);
            
            history(req.user.id, "Actualizo un producto de la tienda");
            return res.status(200).send({
                type: "nice",
                message: "Actualizacion completada",
               
            });

        }catch (error) {
            
            return res.status(400). send({
                message: error
            });
        }

    },

    delete: async (req, res) =>{

        const id = req.params.id;
        try{

            let sqlDelete = "DELETE FROM products WHERE id = ?";
            const result = await con.execute(sqlDelete, [id]);

            history(req.user.id, "Elimino un producto de la tienda");
            return res.status(200).send({
                type: "nice",
                message: "Producto eliminado"
            });
        }catch(error){
            console.log(error)
            return res.status(405).send({
                message: error
            });
        }
    },

    getCategories: async (req, res) =>{

        try{

            let sqlGet = "SELECT * FROM categorias";
            const [rows] = await con.execute(sqlGet);

            return res.status(200).send({
                type: "nice",
                categorias: rows
            })
            
        }catch(error){
            return res.status(200).send({
                type: "error",
                message: error
            });
        }

    },

    getProductos : async (req, res) =>{

        const param = req.params.id;
        let instruccion = param.split("-");
        try{

            if(instruccion[0] == "categorie"){

                let sql = "SELECT products.*, categorias.categoria FROM products, categorias WHERE (products.id_categoria = ? AND products.id_categoria = categorias.id)";
                const [rows] = await con.execute(sql, [instruccion[1]]);

                return res.status(200).send({
                    type:"nice",
                    products: rows
                });
            };

            if(instruccion[1] == "all"){

                let sql = "SELECT products.*, categorias.categoria FROM products, categorias WHERE products.id_categoria = categorias.id";
                const [rows] = await con.execute(sql);

                return res.status(200).send({
                    type: "nice",
                    products: rows
                });
            };

            if(instruccion[0] == "search"){

                if(instruccion[1].length <= 2){
                    console.log(instruccion[1])
                    let sql = "SELECT products.*, categorias.categoria FROM products INNER JOIN categorias ON products.id_categoria = categorias.id WHERE products.nombre LIKE ? OR products.descripcion LIKE ?";
                    const [rows] = await con.execute(sql, ["%"+instruccion[1]+"%", "%"+instruccion[1]+"%"]);

                    return res.status(200).send({
                        type: "nice",
                        products: rows
                    });
                }

                let sql = "SELECT products.*, categorias.categoria FROM products INNER JOIN categorias ON products.id_categoria = categorias.id WHERE MATCH (nombre, descripcion) AGAINST (?)";
                const [rows] = await con.execute(sql, [instruccion[1]]);

                return res.status(200).send({
                    type: "nice",
                    products: rows
                });
            }

            let sql = "SELECT products.*, categorias.categoria FROM products, categorias WHERE(products.id = ? AND products.id_categoria = categorias.id)";
            const [rows] = await con.execute(sql, [instruccion[1]]);

            return res.status(200).send({
                type: "nice",
                product: rows
            });

           
        }catch(error){
            console.log(error);
            return res.status(200).send({
                type: "error",
                message: "error inesperado"
            });
        }    
    }
};

export default controllersProduct;