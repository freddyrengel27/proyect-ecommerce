<template>
    <div class="contenedor__userOn">
        <div class="contenedor__notificaciones">
            <div class="notification__iten" @click="clickCarrito()">
                <img src="../assets/img/carro-de-la-carretilla.png">
                <div class="contador__carrito">
                    <span>{{$store.state.numCarrito}}</span>
                </div>    
            </div>
            <div ref="noti" class="contenedor__verCarrito" v-if="showMM">
                <div class="verCarrito__title">
                    <h4>Tu Carrito</h4>
                </div>
                <div class="verCarrito__body">
                    <div class="verCarrito__iten" v-for="carrito in $store.state.carrito" :key="carrito.id_carrito" @click="redirectProduct(carrito)">
                        <div class="verCarrito__img">
                            <img :src="carrito.urlImage">
                        </div>
                        <div class="verCarrito__info">
                            <span class="span__verNombre">{{carrito.nombre}}</span>
                            <span class="span__verCategoria">{{carrito.categoria}}</span>
                            <span class="span__verCategoria">U$S {{carrito.precio}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contenedor__infoUser" @click="setShowMenu">
            <div class="contenedor__menu">
                <div class="menu__infoUser">
                    <span class="infoUSer__text span__email">{{$store.state.userInf.username}}</span>
                    <span class="infoUSer__text span__nombre">{{$store.state.userInf.nombre}} {{$store.state.userInf.apellido}}</span>
                </div>
                <div class="menu__btnUser">
                    <img :class="{menu__btnUserImg: showMenu}" src="../assets/img/flecha-hacia-abajo.png">
                </div>
            </div>
            
        </div>
        
    </div>
    
</template>

<script>
import { ref } from '@vue/reactivity';
import {useRouter} from "vue-router";

export default {
    name: "NotificationUser",
    setup(props, {emit}){
        const router = useRouter();
        const showMenu = ref(false)
        const showMM = ref(false)
        const noti = ref();
        const setShowMenu = () =>{
            showMenu.value = !showMenu.value;
            emit("setShowMenu", showMenu.value);
        };


        const clickCarrito = () =>{
            showMM.value = !showMM.value
        };

        const redirectProduct = (carrito) =>{
            router.push("/product/product-" + carrito.id_product);
            showMM.value = false
        };

        return{
            showMenu,
            setShowMenu,
            clickCarrito,
            noti,
            showMM,
            redirectProduct
        }
    }
}
</script>