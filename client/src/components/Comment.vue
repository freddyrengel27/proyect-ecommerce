<template>
    <div class="contenedor__comentario" :class="{contenedor__comentarioActivo: showRespuesta}">
        <div class="elComent">
        <div class="contenedor__comentarioNames">
            <span class="comentario__username">{{comentario.username}}</span>
            <span class="comentario__name">{{comentario.nombre}} {{comentario.apellido}}</span>
        </div>
        <div class="comentario">
            
            <div class="btns__editComent">
                <button @click="showEdit = !showEdit"><img src="../assets/img/lapiz-de-color.png"></button>
                <button><img src="../assets/img/bote-de-basura.png"></button>
            </div>
            <p v-if="!showEdit">{{comentario.comment}}</p>
            <textarea class="form-control" v-model="newComentario" v-else></textarea>
            </div>
            
        </div>
            <span class="btn__responder" v-if="!showRespuesta && $store.state.userInf.id == iduser" @click="showRespuesta = !showRespuesta">Responder</span>

        <div class="contenedor__respuesta" v-if="showRespuesta">
            <div class="contenedor__inputRespuesta" v-if="respuesta.length == 0">
                <div class="comment__text" >
                    <textarea class="form-control"></textarea>
                 </div>
                 <button class="btn btnComent btn-primary">Responder</button>
            </div>
           
            <div class="contenido__respuesta" v-else>
                <p></p>
            </div>
            <span class="btn__responder" v-if="showRespuesta" @click="showRespuesta = !showRespuesta">Cancelar</span>

        </div>


    </div>
</template>

<script>
import {ref} from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core';
export default {
    name: "Comment",
    props: {comentario:{
        type: Object
    },
    iduser:{
        type: Number
    }
    },
    setup(props){

        const showRespuesta = ref(false);
        const newComentario = ref("");
        const showEdit = ref(false);
        const respuesta = ref([]);


       watchEffect(() =>{
           newComentario.value = props.comentario.comment; 
       });

        
        

       

        return{
            showEdit,
            newComentario,
            showRespuesta,
            respuesta,
        }
    }

}
</script>