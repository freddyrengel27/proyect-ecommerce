<template>
    <main class="main__registro">
        <div class="contenedor__login">
            <h4>¡Hola! te estabamos esperando</h4>
            <div class="contenedor__relogin">
                <div class="targeta__relogin" v-for="user in saveSession" .key="user.username">
                    <div class="relogin__info" @event.stop @click="getSaveUser(user)">
                        <span class="relogin__username">{{user.username}}</span>
                        <span class="relogin__nombre">{{user.nombre}}</span>
                    </div>
                    <button @click="clearSaveUser(user)"><img src="../assets/img/bote-de-basura.png"></button>
                </div>
            </div>
            <form class="form__login">
                <div class="form__iten iten__login">
                    <label>Nombre de usuario</label>
                    <input type="text" class="form-control"  placeholder="username" v-model="dataUser.username">
                </div>
                <div class="form__iten iten__login">
                    <label>Password</label>
                    <input type="password" class="form-control"  placeholder="password" v-model="dataUser.password">
                </div>
            </form>
            <div class="login__btns" v-if="!loader">
                    <button class="btn btn-primary" @click="submitLogin">Enviar</button>
                    <router-link class="btn btn-light" to="/registration">Crea tu cuenta</router-link>
            </div>
            <div class="login__btns contenedor__loaderLogin" v-else>
                <div class="login__loader"></div>
            </div>    
            <div class="contenedor__rclave">
                <a @click="showModal = !showModal">Recuperar contraseña</a>
            </div>
        </div>

        <div class="contenedor__modal" v-if="showModal">

            <form class="form__modal">

                <span>Una vez solicitado la recuperacion de contraseña contara con 20m para ingresar link enviado al correo</span>

                <div class="form__modaliten">
                    <label>Ingrese el correo registrado en su cuenta</label>
                    <input type="email" class="form-control inputR"  placeholder="email" v-model="recuperacion.email">
                    <input type="submit" value="Enviar" class="btn btn-primary" @click="submitRecuperacion">
                </div>
                    <button class="btn btn-danger" @click="showModal = !showModal">Cancelar</button>
            </form>

        

        </div>



    </main>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import useVuelidate from "@vuelidate/core";
import {required, minLength, maxLength, email} from "@vuelidate/validators";
import swal from 'sweetalert';
import axios from "axios";
import {useStore} from "vuex";
import {savetToken} from "../tools/tokenTools.js";
import {useRouter} from "vue-router";
import {saveInfoSession, getInfoSession} from "../tools/initFast.js"
import { onBeforeMount } from '@vue/runtime-core';

export default {
    name: "Login",
    setup(){
        const store = useStore();
        const router = useRouter();

        const showModal = ref(false);
        const saveSession = ref([]);
        const loader = ref(false);
        const dataUser = reactive({
            username: "",
            password: ""
        });

        const recuperacion = reactive({
            email: ""
        });

        onBeforeMount(() =>{
            saveSession.value = getInfoSession();
        });
        
        const rules = reactive({
            username: {required, minLength: minLength(2), maxLength: maxLength(16)},
            password: {required, minLength: minLength(6)}
        });

        const rulesRecuperacion = reactive({
            email: {required, email}
        });

        const v$ = useVuelidate(rules, dataUser);
        const vR$ = useVuelidate(rulesRecuperacion, recuperacion);

        const submitLogin = async () =>{
            loader.value = true;
            v$.value.$touch();
            if(v$.value.$invalid){
                loader.value = false;
                dataUser.password = "";
                return swal("error", "Error en las campos", "revise los campos insertados")
            }
            const response = await axios.post(process.env.VUE_APP_HOST_URL+"login", dataUser);
            if(response.data.type == "error"){
                loader.value = false;
                dataUser.password = "";
                return swal("error en los campos", response.data.message, "error");
            }
            savetToken("token", response.data.token);
            await store.dispatch("setStateUser", {token: response.data.token});
            saveInfoSession(store.state.userInf.nombre, store.state.userInf.username)
            router.push("/");
        };

        const submitRecuperacion = async () =>{
            vR$.value.$touch();
             if(vR$.value.$invalid){
                return swal("Error en las campos", "revise los campos insertados", "error")
            }
            const res = await axios.post(process.env.VUE_APP_HOST_URL + "recovery", recuperacion);

            if(res.data.type == "error"){
                recuperacion.email = "";
                return swal("Error en las campos", res.data.message, "error");
            }
            recuperacion.email = "";
            showModal.value = false
            swal("Correo enviado", "El correo se envio a su correo recuerde que cuenta con 20m para terminar la operacion", "success");
        }

        const getSaveUser = (user) =>{
            dataUser.username = user.username;
        };

        const clearSaveUser = ({username}) =>{
            saveSession.value = saveSession.value.filter(user => user.username !== username);
            localStorage.setItem("dataSession", JSON.stringify(saveSession.value))
        }

        return{
            dataUser,
            v$,
            vR$,
            submitLogin,
            loader,
            saveSession,
            getSaveUser,
            clearSaveUser,
            showModal,
            recuperacion,
            submitRecuperacion
        }
    }
}
</script>