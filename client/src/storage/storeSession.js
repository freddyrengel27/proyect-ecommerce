import {createStore} from "vuex";
import axios from "axios";
import {useRouter} from "vue-router"

const router = useRouter();
const storeSession = createStore({
    state:{
        stateSession: false,
        userInf: [],
        userValid: [],
        busqueda: "",
        numCarrito: 0,
        carrito: [],
        clickTarget: "",
    },
    mutations:{
        setSession(state, value){
            state.stateSession = value;
        },
        setUserInfo(state, value){
            state.userInf = value;
        },
        setUserValid(state, value){
            state.userValid = value;
        },
        setBusqueda(state, value){
            state.busqueda = value;
        },
        setNumCarrito(state, value){
            state.numCarrito = value;
        },
        setCarrito(state, value){
            state.carrito = value;
        },
        setClickTarget(state, value){
            state.clickTarget = value;
        }
    },
    actions:{
        async setStateUser({commit}, token){
            const response = await axios.post(process.env.VUE_APP_HOST_URL+"decode", token);
            if(response.data.type == "exp"){
                commit("setUserValid", response.data.info);
              return router.push("/login");
            }
            const getCarrito = await axios.get(process.env.VUE_APP_HOST_URL + "getcarrito");
            commit("setUserInfo", response.data.info);
            commit("setSession", true);
            commit("setNumCarrito", getCarrito.data.contadorCarrito);
            commit("setCarrito", getCarrito.data.carrito);
        }
    }

});

export default storeSession;