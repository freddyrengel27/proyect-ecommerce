'use strict'
import {Router} from "express";
import multer from "multer";
import storage from "../imgconfig.js";

const upload = multer({storage});

import controllerUser from "../controllers/users.js";
import middleware from "../middleware/middleware.js";
import controllersProduct from "../controllers/product.js";
import controllersComments from "../controllers/comments.js";
import controllersCarrito from "../controllers/carrito.js";
import controllerSetPass from "../controllers/setPass.js";
import getHistory from "../controllers/getHistory.js";

const routes = Router();

// Users

routes.post("/registration", controllerUser.registration);
routes.post("/login", controllerUser.login)
routes.post("/decode", controllerUser.decode);

// Set Pass

routes.post("/recovery", controllerSetPass.recovery);
routes.get("/getrecovery/:id", controllerSetPass.getRecovery);
routes.put("/setrecovery", controllerSetPass.setRecovery);


// Productos

routes.get("/getproducts/:id", controllersProduct.getProductos);
routes.post("/newproduct", middleware, controllersProduct.add);
routes.post("/imgProduct/:id", middleware, upload.single("image"), controllersProduct.imgeProduct)
routes.put("/updateproduct", middleware, controllersProduct.update);
routes.delete("/deleteproduct/:id", middleware, controllersProduct.delete);

// Categorias

routes.get("/getcategories", controllersProduct.getCategories);

// Comentarios

routes.get("/getcomments/:id", controllersComments.getComments);
routes.post("/addcomment", middleware, controllersComments.add);
routes.put("/updatecomment", middleware, controllersComments.update);
routes.delete("/deletecomment/:id", middleware, controllersComments.delete);


// Carrito

routes.get("/getcarrito", middleware, controllersCarrito.get);
routes.post("/addcarrito", middleware, controllersCarrito.add);
routes.delete("/deletecarrito/:id", middleware, controllersCarrito.delete);

// historial

routes.get("/gethistory", middleware, getHistory);

export default routes;