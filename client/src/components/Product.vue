<template>
    <main class="main__add">
        
        <div class="contenedor__product" v-if="producto">
            <div class="exp">
            <div class="contenedor__infoProduct">
                <div class="contenedor__imgProduct">
                    <div class="contenedor__btnEdit">
                        <button @click="deleteProducto" v-if="$store.state.userInf.id == producto.id_user"><img src="../assets/img/bote-de-basura.png"></button>
                    </div>

                    <img :src="producto.urlImage">

                </div>
                <div class="contnedor__targetaProduct">
                    <div class="targeta__producto">
                        <div class="targeta__header">
                            <h4>{{producto.nombre}}</h4>
                            <span class="targeta__categoria">{{producto.categoria}}</span>
                            <span class="targeta__precio">U$S {{producto.precio}}</span>
                            
                            <div class="targeta__btns">
                                <h4 v-if="!compraLoader">!!rapido antes que se acabe</h4>
                                <button class="btn-targeta btn btn-primary" @click="addCarrito(producto)" v-if="!compraLoader && $store.state.stateSession">Añadir al carrito</button>
                                <Loader  v-if="compraLoader"/>
                            </div>
                        </div>
                        <div class="targeta__body">
                            <h4>Descripcion del producto</h4>
                           <div class="targeta__descripcion">
                               <p>{{producto.descripcion}}</p>
                           </div>
                        </div>
                    </div>
                </div>

                <Transition name="noti">
                <div class="contenedor__noticacionAdd" v-if="showNoticicacion">
                    <button @click="showNoticicacion = !showNoticicacion">X</button>
                    <span>{{producto.nombre}} fue añadido al carrito</span>
                </div>
                </Transition>
            </div>

            <div class="contenedor__commentProduct">
                <h4>Preguntas y respuestas</h4>
                <div class="comment_product">
                    <div class="coment__input" v-if="$store.state.stateSession">
                        <div class="comment__text">
                            <textarea class="form-control" v-model="pregunta.comentario"></textarea>
                        </div>
                        <button class="btn btnComent btn-primary" @click="savePreunta">Preguntar</button>
                    </div>
                    <div class="coment">
                        <Comment v-for="comet in comentarios" :key="comet.id_comment" :comentario="comet" :iduser="producto.id_user" />
                    </div>
                </div>

            </div>

            </div>

            
        </div>

            <Loader  v-else/>
        
    </main>
</template>

<script>
import Comment from "./Comment.vue";
import {useRoute, useRouter} from "vue-router";
import { reactive, ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import axios from "axios";
import Loader from "./Loader.vue";
import useVuelidate from "@vuelidate/core";
import {required, minLength} from "@vuelidate/validators";
import swal from "sweetalert";
import {useStore} from "vuex";

export default {
    name: "Product",
    components:{
        Comment,
        Loader
    },
    setup(){
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const producto = ref();
        const comentarios = ref([]);
        let {id} = route.params
        const showNoticicacion = ref(false);
        const targetProduct = ref("");
        const compraLoader = ref(false);

        const pregunta = reactive({
            comentario: "",
            id_product: ""
        })

        const rules = {
            comentario: {required, minLength: minLength(8)},
            id_product: [required]
        };

        onMounted(async () =>{
            const res = await axios.get(process.env.VUE_APP_HOST_URL+ "getproducts/" + id);
            const resCommets = await axios.get(process.env.VUE_APP_HOST_URL+ "getcomments/" + id);
            producto.value = res.data.product[0];
            comentarios.value = resCommets.data.comentarios;
            pregunta.id_product = producto.value.id
        });

        const updateCommets = async () =>{
             const resCommets = await axios.get(process.env.VUE_APP_HOST_URL+ "getcomments/" + id);
            comentarios.value = resCommets.data.comentarios;
        }

        const v$ = useVuelidate(rules, pregunta);

        const savePreunta = async () =>{
            v$.value.$touch();
            if(!v$.value.$invalid){
                try {
                    const res = await axios.post(process.env.VUE_APP_HOST_URL + "addcomment", pregunta);
                    if(res.data.type == "nice"){
                        updateCommets();
                        pregunta.comentario = "";
                    }
                } catch (error) {
                    console.log(error)
                    swal("error", "ha ocurrido un error inesperado", "error");
                }
            }
        };
        
        const addCarrito = async ({id, nombre}) =>{
            compraLoader.value = true
            const res = await axios.post(process.env.VUE_APP_HOST_URL + "addcarrito", {idProduct : id});
            console.log(res);
            if(res.data.type == "error"){
                compraLoader.value = false
                return swal("error", res.data.message, "error");
            }
            const getCarrito = await axios.get(process.env.VUE_APP_HOST_URL + "getcarrito");
            store. commit("setNumCarrito", getCarrito.data.contadorCarrito);
            store.commit("setCarrito", getCarrito.data.carrito);
            targetProduct.value = nombre;
            showNoticicacion.value = true;
            compraLoader.value = false
            setTimeout(() =>{
                showNoticicacion.value = false;
            }, 6000)
        };

        const deleteProducto = () =>{
            swal({
                    title: "Seguro que dese eliminar esta publicacion",
                    text: "Si elimina esta publicacion no tendra forma de recuperarla",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
            }).then((willDelete) => {
            if (willDelete) {
                axios.delete(process.env.VUE_APP_HOST_URL + "deleteproduct/" + producto.value.id)
                .then(res =>{
                    if(res.data.type == "error"){
                        return swal("error", "nosepudo eliminar la publicacion")
                    }
                })
                router.push("/products/product-all")
            swal("Poof! Your imaginary file has been deleted!", {
             icon: "success",
            });
             } else {
            swal("No se elinara la publicacion");
                }
            });
        };

        watch(  () => route.params, async(nuevo) =>{
            const ress = await axios.get(process.env.VUE_APP_HOST_URL+ "getproducts/" + nuevo.id);
            const ressCommets = await axios.get(process.env.VUE_APP_HOST_URL+ "getcomments/" + nuevo.id);
            producto.value = ress.data.product[0];
            comentarios.value = ressCommets.data.comentarios;
            pregunta.id_product = producto.value.id
        });

        
        return{
            producto,
            comentarios,
            pregunta,
            v$,
            savePreunta,
            showNoticicacion,
            targetProduct,
            addCarrito,
            compraLoader,
            deleteProducto
        }
    }
    
}
</script>