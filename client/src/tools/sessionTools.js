import {useStore} from "vuex";
import {getToken} from "./tokenTools.js";

const setSaveSession = async () =>{
    const store = useStore();
    const token = getToken("token");
    if(token){
       await store.dispatch("setStateUser", {token});
    }
};

export default setSaveSession;