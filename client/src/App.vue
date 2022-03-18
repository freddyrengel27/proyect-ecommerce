<template>
  <div class="contenedor" @click="getSelec($event)">

    <Header />
    <router-view></router-view>
  
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import setSaveSession from "./tools/sessionTools.js";
import axiosInterceptors from "./tools/requestAxios.js";
import {useStore} from "vuex";

axiosInterceptors()

export default {
  name: 'App',
  components: {
    Header
  },
  setup(){
    setSaveSession()
    const store = useStore()

    const getSelec = (e) =>{
      store.commit("setClickTarget", e.target)
    } 

    return{
      getSelec
    }
  }
}
</script>


