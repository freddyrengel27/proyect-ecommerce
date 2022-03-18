<template>
<div>
    <main class="main">
        <div class="contenedor__carrusel">
            <SliderHome/>
        </div>
        <div class="contenedor__publi">

        </div>

        <div class="contenedor__categorias">
            <div class="categorias__mas">
                <span>Ver todas las <b><router-link to="/categories">Categorias</router-link></b></span>
            </div>
            <div class="contenedor__car">
                <div class="categias__car">
                    <span>Ropa</span>
                    <img src="../assets/img/sudadera-con-capucha.png">
                </div>
                <div class="categias__car">
                    <span>Deporte</span>
                    <img src="../assets/img/deportes-con-balones.png">
                </div>
                <div class="categias__car">
                    <span>Electrodomesticos</span>
                    <img src="../assets/img/electrodomestico.png">
                </div>
                <div class="categias__car">
                    <span>Comida</span>
                    <img src="../assets/img/comida-sana.png">
                </div>
            </div>
        </div>
    </main>
    <Footer/>
</div>    
</template>

<script>
import Footer from "./Footer.vue";
import SliderHome from "./SliderHome.vue";


export default {
    name: "Home",
    components:{
        Footer,
        SliderHome
    },
    setup(){
        
    
    }
    
}
</script>