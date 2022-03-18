<template>
<header class="header">
    <div class="contenedor__logo">
        <router-link to="/" custom v-slot="{navigate}">
            <h1 @click="navigate" @keypress.enter="navigate" role="link">CloneComerce</h1>
        </router-link>
    </div>

    <div class="contenedor__buscador">
            <form class="contenedor__inputBuscador" v-if="$route.path != '/login' && $route.path != '/registration'" @submit.prevent>
            <input ref="getTarget" type="text" placeholder="Buscar productos" class="form-control" v-model="buscador" @focus="getEstado">
            <button @click="busqueda"><img src="../assets/img/40407.png"></button>
            <div class="connedor__parec" v-if="$store.state.clickTarget ==  getTarget && complite.length > 0">
                <div class="parec" v-for="complete in complite" :key="complete.nombre" @click="setBuscador(complete)">
                    <span>{{complete.nombre}}</span>
                </div>
            </div>
            </form>
    </div>

    <div class="contenedor__usernav" v-if="$route.path != '/login' && $route.path != '/registration' ">
        <div class="contenedor__useroff" v-if="!$store.state.stateSession">
            <div class="useroff__msg">
                <img src="../assets/img/carrito-de-compras.png">
                <p>Ingresa y descubre con nosotros la mejor oferta</p>
            </div>
            <div class="useroff__botonera">
                <router-link class="nav__itenoff" to="/registration">Crea tu cuenta</router-link>
                <router-link class="nav__itenoff" to="/login">Ingresa</router-link>
            </div>
        </div>

        <NotificationUser @setShowMenu="setMenu" v-else />

        <nav class="nav__user" v-if="showMenu">
            <ul class="nav__ulUser">
                <router-link to="" class="nav__itenUser">Mi Perfil</router-link>
                <router-link to="/addproduct" class="nav__itenUser">Subir Producto</router-link>
                <a href="#" class="nav__itenUser" @click="closeSession">Cerrar Session</a>
            </ul>
        </nav>

    </div>

    <div class="btn__burger">
        <button><img src="../assets/img/menu.png"></button>
    </div>

    
</header>
    
</template>

<script>
import { ref } from '@vue/reactivity';
import NotificationUser from "./NotificationUser.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import { watch } from '@vue/runtime-core';
import socket from "../socket/socket.js";

export default {
    name: "Header",
    components:{
        NotificationUser
    },
    setup(){
        const buscador = ref("");
        const router = useRouter();
        const store = useStore();
        const showMenu = ref(false);
        const getTarget = ref();
        const complite = ref([]);

        const setMenu = (estado) =>{
            showMenu.value = estado
        };

        const closeSession = () =>{
            localStorage.removeItem("token");
            store.commit("setSession", false);
            store.commit("setUserInfo", []);
            showMenu.value = false;
            router.push("/");
        }

       const busqueda = () =>{
           if(buscador.value.length >=1){
               router.push(`/products/search-${buscador.value}`)
           }

            store.commit("setBusqueda", buscador.value)
       }

        const getEstado = (e) =>{
            getTarget.value = e.target

        }

        const setBuscador = ({nombre}) =>{
            buscador.value = nombre;
        }

        watch(() => buscador.value, (nuevo) =>{
            socket.emit("prueva", nuevo);
        });

        socket.on("autoRes", (msg) =>{
            complite.value = msg
        })

        return{
            showMenu,
            setMenu,
            closeSession,
            buscador,
            busqueda,
            getEstado,
            setBuscador,
            getTarget,
            complite
        }
    }

}
</script>