<template>
    <main class="main__add">
        <div class="contenedor___categorias" >
            <div class="car__categoria" v-for="categoria in categorias" :key="categoria.id" @click="verListaProduct(categoria)">
                <h4>{{categoria.categoria}}</h4>
            </div>
        </div>
    </main>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onBeforeMount } from '@vue/runtime-core';
import axios from 'axios';
import {useRouter} from "vue-router";
export default {
    name: "Categories",
    setup(){
        const router = useRouter();

        const categorias = ref([]);

        onBeforeMount(async () =>{
            const res = await axios.get(process.env.VUE_APP_HOST_URL+ "getcategories");
            categorias.value = res.data.categorias; 
        });

        const verListaProduct = ({id}) =>{
            router.push(`/products/categorie-${id}`);
        };

        return{
            categorias,
            verListaProduct
        }
    }
}
</script>