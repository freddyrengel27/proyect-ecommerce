<template>
    <main class="main__products">

        <Loader v-if="!productos"/>

        <div class="contenedor_carsProducts" v-else>

            <div class="car__products" v-for="proct in productos" :key="proct.id" @click="vistaProducts(proct)">
                <div class="car__imgProducts">
                    <img :src="proct.urlImage">
                </div>
                <div class="car__informacion">
                    <h4>{{proct.nombre}}</h4>
                    <span class="car__spanPrecio">U$S {{proct.precio}}</span>
                    <span class="car__spanFecha">Publicado hace {{timeFormat(proct.fecha, proct.hora)}}</span>
                </div>
            </div>

            

        </div>
    </main>
</template>

<script>
import { ref } from '@vue/reactivity';
import Loader from "./Loader.vue"
import {useRoute, useRouter} from "vue-router";
import { onMounted, watch } from '@vue/runtime-core';
import axios from "axios";
import {timeFormat}from "../tools/formatFechas.js"
import {useStore} from "vuex";

export default {
    name: "Products",
    components:{
        Loader
    },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const {id} = route.params;
        const productos = ref();
        const store = useStore();

        onMounted(async () =>{
            const res = await axios.get(process.env.VUE_APP_HOST_URL + "/getproducts/"+ id);
            productos.value = res.data.products;
        });
       
        const vistaProducts = ({id}) =>{
            router.push(`/product/product-${id}`);
        }

        watch (() => store.state.busqueda, async (nuevo) =>{
            const response = await axios.get(process.env.VUE_APP_HOST_URL + "/getproducts/" + nuevo);
            productos.value = response.data.products;
        })


        return{
            productos,
            timeFormat,
            vistaProducts
        }
    }
}
</script>