<template>
    <main class="main__add">
        <h1>Recuperacion de contraseña</h1>
        <div class="contenedor__recuperacion" v-if="user">
            <h4>Hola {{user.nombre}} {{user.apellido}} te ayudamos a recuperar tu contraseña</h4>
            <div class="contenedor__pasosR">
                <Transition name="pasos">
                <div class="paso_recuperacion" v-if="!showPasosRecuperacion">
                    <h5>Paso 1</h5>
                    <span>Verificacion</span>
                </div>
                <div class="paso_recuperacion" v-else>
                    <h5>Paso 2</h5>
                    <span class="span__paso">Cambio de contraseña</span>
                </div>
                </Transition>
            </div>
            <form class="form__recuperacion" @submit.prevent>
                <Transition name="pasos">
                <div class="inputs__recuperacion" v-if="!showPasosRecuperacion">
                    <label>Ingrese su nombre de usuario</label>
                    <input type="text" class="form-control"  placeholder="User Name" v-model="username">
                    <p class="pRecuperacion" v-if="errorName">El nombre de usuario no coincide</p>
                    <button class="btn btn-success btn__recupecion" @click="nextPage">Siguiente</button>
                </div>

                <div class="inputs__recuperacion" v-else>

                    <label>Indique su nueva contraseña</label>
                    <input type="password" class="form-control"  placeholder="Password" v-model="userPas.password">
                    <p class="pRecuperacion" :class="{activeRecuperacion: userPas.password.length >= 6}">Minimo de caracteres 6</p>

                    <label>Confirme su contraseña</label>
                    <input type="password" class="form-control"  placeholder="Validacion de Password" v-model="userPas.confirmacion">
                    <p class="pRecuperacion" :class="{activeRecuperacion: userPas.confirmacion == userPas.password && userPas.password.length >= 6}">Los dos campos deben coincidir</p>

                    <button class="btn btn-primary btn__recupecion" v-if="!showSend" @click="submitSend">enviar</button>
                    <Loader v-else></Loader>
                </div>
                </Transition>
            </form>

        </div>
            <Loader v-else></Loader>
    </main>
</template>

<script>
import Loader from "./Loader.vue"

import { reactive, ref } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core';
import {useRoute, useRouter} from "vue-router";
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core'
import {required, minLength} from "@vuelidate/validators";
import swal from 'sweetalert';

export default {
    name: "Recovery",
    components:{
        Loader
    },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const showPasosRecuperacion = ref(false);
        const showSend = ref(false);
        const user = ref();
        const errorName = ref(false);
        const username = ref("");


        const userPas = reactive({
            id: "",
            password: "",
            confirmacion: ""
        });

        const rules = {
            id: {required},
            password: {required, minLength: minLength(6)},
            confirmacion: {required}
        };

        const v$ = useVuelidate(rules, userPas);
        
    

        onBeforeMount(async () =>{
            const token = route.params.id;
            const res = await axios.get(process.env.VUE_APP_HOST_URL + "getrecovery/" + token);
            user.value = res.data.info;
            console.log(user.value);
        });

        
        const nextPage = () =>{

            if(username.value == user.value.username){
                userPas.id = user.value.id
                return showPasosRecuperacion.value = true
            }
            return errorName.value = true;
        }

        const submitSend = async () =>{
            showSend.value = true;
            if(userPas.password != userPas.confirmacion){
                showSend.value = false;
                return swal("error", "los campos no coinciden", "error");
            }
            v$.value.$touch();
            if(v$.value.$invalid){
                showSend.value = false;
                userPas.password = "";
                userPas.confirmacion = "";
                return swal("error", "Verifique los campos", "error");
            }

            try {
                const response = await axios.put(process.env.VUE_APP_HOST_URL + "setrecovery", userPas);
                if(response.data.type == "error"){
                     showSend.value = false;
                     userPas.password = "";
                    userPas.confirmacion = "";
                    return swal("error", response.data.message, "error");
                }
                swal("Exito", "El cambio de clave fue exitoso dirijase al login para iniciar session", "success");
                router.push("/login");

            } catch (error) {
                return swal("error", "error en la operacion", "error");
            }
            


        }    


        return{
            showPasosRecuperacion,
            showSend,
            user,
            userPas,
            errorName,
            username,
            nextPage,
            v$,
            submitSend
        }
    }

}
</script>