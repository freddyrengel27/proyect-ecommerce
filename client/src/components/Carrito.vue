<template>
    <main class="main__products">

        <div class="contenedor__dashboardCarrito">
            <div class="contenedor__carritoInfo">

                <div class="carrito__infoDiv">
                    <span><b>Nombre de usuario</b>{{$store.state.userInf.username}}</span>
                </div>
                <div class="carrito__infoDiv">
                    <span><b>Nombre completo</b>{{$store.state.userInf.nombre}} {{$store.state.userInf.apellido}}</span>
                </div>
                <div class="carrito__infoDiv">
                    <span><b>Email</b>{{$store.state.userInf.email}}</span>
                </div>
            </div>

            <div class="contenedor__carritoNotificaciones">
                <div class="header__carrittoNotificaciones">
                    <h4>Historia</h4>
                </div>
                <div class="notificaciones">

                    <div class="carrito__margi" v-for="hist in historial" :key="hist.id_historia">
                        <div class="info__historial">
                            <span>{{hist.evento}}</span>
                        </div>
                        <div class="fecha__historial">
                            <span>{{hist.fecha_historia}}</span>
                        </div>
                        
                    </div>

                </div>

            </div>

        </div>
        <div class="contenedor__carrito">
            <div class="header__carrittoNotificaciones">
                <h4>Carrito de Compras</h4>
            </div>

            <div class="caja__carrito">

                <div class="carrito__margi" v-for="car in $store.state.carrito" :key="car.id_carrito">
                    <div class="carrito__info">
                        <span class="carrito_redirect" @click="redirectProduct(car)">{{car.nombre}}</span>
                    </div>
                    <div class="carrito__info" >
                        <span >{{car.categoria}}</span>
                    </div>
                    <div class="carrito__info">
                        <span>{{car.precio}}</span>
                    </div>
                    <div class="carrito__info">
                       <span>{{timeFormat2(car.fecha_carrito)}}</span>
                    </div>
                    <div class="carrito__accion">
                        <button class="btn btn-primary">Comprar</button>
                        <button class="btn btn-danger" @click="deleteCarrito(car)">Borrar</button>
                    </div>
                </div>

            </div>

        </div>

    </main>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import {timeFormat2} from "../tools/formatFechas.js";
import swal from 'sweetalert';
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import { onBeforeMount } from '@vue/runtime-core';
export default {
    name: "Carrito",
    setup(){
        const router = useRouter();
        const store = useStore();
        const historial = ref([]);

       onBeforeMount(async() =>{
           const res = await axios.get(process.env.VUE_APP_HOST_URL + "gethistory");
            historial.value = res.data.historial;
       });



        const deleteCarrito = async ({id_carrito}) =>{
            const resDelete = await axios.delete(process.env.VUE_APP_HOST_URL + "deletecarrito/" + id_carrito);
            if(resDelete.data.type == "error"){
                return swal("errpr", "no se pudo eliminar del carrito", "error");
            }
            let nuevoCarrito = store.state.carrito.filter(car => car.id_carrito != id_carrito);
            store.commit("setCarrito", nuevoCarrito);
            store.commit("setNumCarrito", store.state.numCarrito - 1);
            swal("exito", "Se elimino el producto con exito", "success");

        };

        const redirectProduct = ({id_product}) =>{
            router.push("/product/product-" + id_product);
        };

        return{
            timeFormat2,
            deleteCarrito,
            redirectProduct,
            historial,
        }
    }
}
</script>