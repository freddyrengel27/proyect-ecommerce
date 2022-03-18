<template>
    <main class="main__registro">
        <div class="contenedor__central">
            <h4 v-if="!finRegistro">Ingrese los datos solicitados</h4>
                <form class="form__registro" v-if="!finRegistro">
                        <div class="form__iten">
                            <label>Nombre</label>
                            <input type="text" class="form-control"  placeholder="" v-model="dataUser.nombre">
                        </div>
                        <div class="form__iten">
                            <label>Apellido</label>
                            <input type="text" class="form-control"  placeholder="" v-model="dataUser.apellido">
                        </div>
                        <div class="form__iten">
                            <label>Nombre de usuario</label>
                            <input type="text" class="form-control"  placeholder="" v-model="dataUser.username">
                        </div>
                        <div class="form__iten">
                            <label>Email</label>
                            <input type="email" class="form-control"  placeholder="" v-model="dataUser.email">
                        </div>
                        <div class="form__iten">
                            <label>Password</label>
                            <input type="password" class="form-control"  placeholder="" v-model="dataUser.password">
                            <p :class="{trueLength: dataUser.password.length >= 6}">Minimo de caracteres 6</p>
                        </div>
                        <div class="form__check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" v-model="dataUser.check">
                            <label class="form-check-label" for="gridCheck">
                            Acepto los Términos y Condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad.
                            </label>
                        </div>
                </form>
                <div class="contenedor__btnsRegistro" v-if="!finRegistro">
                <button class="btn btn-primary btn__registro" @click="submitRegistro" v-if="!loading">Registrar</button>
                <div class="registro__contenedorLoader" v-else>
                    <div class="registro__loader"></div>
                </div>
                </div>
                <div class="find__registro" v-if="finRegistro">
                    <h4>Enhorabuena</h4>
                    <p class="find__registro_p1">!Bienvenido¡ a <b>CloneComerce</b> diríjase a <router-link to="/login">Inicio de session</router-link> y adentrese en la pagina..</p>
                    <p class="find__registro_p2">En <span>{{contador}}</span> sera redirigido a <router-link to="/login">Inicio de session</router-link></p>
                </div>
        </div>
    </main>
</template>

<script>
import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {required, email, minLength, maxLength} from "@vuelidate/validators";
import swal from "sweetalert";
import axios from "axios";
import {useRouter} from "vue-router";
export default {
    name: "Registration",
    setup(){
        const dataUser = reactive({
            nombre: "",
            apellido: "",
            username: "",
            email: "",
            password: "",
            check: "",
        });

        const router = useRouter();
        const finRegistro = ref(false);
        const loading = ref(false);
        const contador = ref(10);

        const rules = reactive({
            nombre: {required, minLength: minLength(2), maxLength: maxLength(12)},
            apellido: {required, minLength: minLength(2), maxLength: maxLength(12)},
            username: {required, minLength: minLength(4), maxLength: maxLength(16)},
            email: {required, email},
            password: {required, minLength: minLength(6), maxLength: maxLength(12)},
            check: {required}
        })

        const setRegistro = () =>{
            setInterval(() =>{
                finRegistro.value = true;
                contador.value--
                if(contador.value == 0){
                    router.push("/login");
                }
            }, 1000)
        }


        const v$ = useVuelidate(rules, dataUser);

        const submitRegistro = async () =>{
            loading.value = true;
            v$.value.$touch();
            if(v$.value.$invalid){
                dataUser.password = "";
                dataUser.check = "";
                loading.value = false;
                return swal("error", "Verifique los campos", "error");    
            }
            const response = await axios.post(process.env.VUE_APP_HOST_URL+"registration", dataUser);
            if(response.data.type == "error"){
                dataUser.password = "";
                dataUser.check = "";
                loading.value = false;
                return swal("error", "Datos ya existentes", response.data.message)
            }
            setRegistro();
        }

        return{
            dataUser,
            v$,
            submitRegistro,
            finRegistro,
            loading,
            contador,
        }
    }
}
</script>