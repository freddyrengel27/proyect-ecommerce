import {createWebHashHistory, createRouter} from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Registration from "../components/Registration.vue";
import Categories from "../components/Categories.vue";
import AddProduct from "../components/AddProduct.vue";
import Product from "../components/Product.vue";
import Products from "../components/Products.vue"
import Carrito from "../components/Carrito.vue";
import Recovery from "../components/Recovery.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
   {
       path: "/login",
       name: "login",
       component: Login
   },
   {
        path: "/registration",
        name: "registration",
        component: Registration
   },
   {
        path: "/recovery/:id",
        name: "recovery",
        component: Recovery
   },
   {
       path: "/categories",
       name: "categories",
       component: Categories
   },
   {
       path: "/addproduct",
       name: "addProduct",
       component: AddProduct
   },
   {
       path: "/product/:id",
       name: "product",
       component: Product
   },
   {
       path: "/products/:id",
       name: "products",
       component: Products
   },
   {
       path: "/carrito",
       name: "carrito",
       component: Carrito
   }


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;