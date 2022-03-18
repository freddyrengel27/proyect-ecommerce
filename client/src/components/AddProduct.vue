<template>
    <main class="main__add">
        <h4>Sube tu producto</h4>
        <form class="form__add" @submit.prevent>

            <div class="contenedor__inputAdd">
                <label>Nombre del producto</label>
                <input type="text" class="form-control" placeholder="Producto" v-model="product.producto">
            </div>
            <div class="contenedor__inputAdd">
                <label>Categoria</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="product.categoria">
                    <option v-for="categoria in getCategorias" :key="categoria.id" :value="categoria.id">{{categoria.categoria}}</option>
                </select>
            </div>
            <div class=" contenedor__inputAdd input__fileAdd">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" name="image" @change="setImage" ref="getImage">
                    <label class="custom-file-label" for="customFile">{{setInfoImage()}}</label>
                </div>
            </div>
            <div class="contenedor__inputAdd ">
                <label>Precio $</label>
                <input type="number" class="form-control" v-model="product.precio">
            </div>
            <div class="contenedor__textAdd ">
                <label>Descripcion</label>
                <textarea class="form-control" rows="5" v-model="product.descripcion"></textarea>
            </div>
            <div class="contenedor__checkAdd">
                <input class="form-check-input" type="checkbox" id="gridCheck" v-model="product.check">
                <label class="form-check-label" for="gridCheck">
                    Aceptas los <span><b>Terminos y Condiciones</b></span> respecto a la subida de productos.
                </label>
            </div>
            <div class="contenedor__btnsAdd" v-if="!loader">
                <input type="submit" class="btn btn-primary" value="Subir producto" @click="submitProduct">
                <router-link to="/" class="btn btn-danger">Regresar</router-link>
            </div>

            <Loader v-else/>

        </form>
    </main>
</template>

<script>
import Loader from "./Loader.vue";
import { reactive, ref } from '@vue/reactivity';
import useVuelidate from "@vuelidate/core";
import {required, minLength, numeric} from "@vuelidate/validators";
import { onBeforeMount } from '@vue/runtime-core';
import axios from "axios";
import swal from 'sweetalert';
import {useRouter} from "vue-router";

export default {
    name: "AddProduct",
    components:{
        Loader
    },
    setup(){
        const loader = ref(false);
        const getImage = ref();
        const imgProduct = ref(null);
        const getCategorias = ref([]);
        const router = useRouter();
        const product = reactive({
            producto: "",
            categoria: "",
            descripcion: "",
            precio: "",
            check: null
        });

        const rules = reactive({
            producto: {required, minLength: minLength(3)},
            categoria: {required},
            descripcion: {required, minLength: minLength(5)},
            precio: {required, numeric},
        });

        const v$ = useVuelidate(rules, product);

        const submitProduct = async () =>{
            loader.value = true;
            v$.value.$touch();
            if(v$.value.$invalid){
                loader.value = false;
                return swal("error", "Campos invalidos", "error");
            }

            if(!product.check){
                loader.value = false;
                return swal("error", "Acepte los terminos y condiciones", "error");
            }
            try {
                console.log(product)
                const response = await axios.post(process.env.VUE_APP_HOST_URL+"newproduct", product);
                console.log(response)
                if(response.data.type == "error") return swal("error", "ha ocurrido un error inesperado", "error");

                let id = response.data.idProduct;

                const formData = new FormData();
                formData.append("image", imgProduct.value, imgProduct.value.name);

                await axios.post(process.env.VUE_APP_HOST_URL + "/imgProduct/" + id, formData);

                router.push("/product/product-" + id);

            } catch (error) {
                loader.value = false;
                console.log(error);
                swal("error", "ha ocurrido un error inesperado", "error");
            }
            
            
        };


        onBeforeMount(async () =>{
           const res = await axios.get(process.env.VUE_APP_HOST_URL+"getcategories");
           getCategorias.value = res.data.categorias;
        })


        const setImage = () =>{
            let img = getImage.value.files[0];
            let vImg = img.name.toLowerCase().split(".");
            if(vImg[1] == "png" || vImg[1] == "jpg" || vImg[1] == "git" || vImg[1] == "jpeg"){
                return imgProduct.value = img;
            }
            return getImage.value.files.pop(0);
        };


        const setInfoImage = () =>{
            if(!imgProduct.value) return "Sube la imagen de tu producto";
            return imgProduct.value.name;
        };


        return{
            product,
            setImage,
            getImage,
            setInfoImage,
            getCategorias,
            v$,
            submitProduct,
            loader
        }
    }

}
</script>