<template>
    <div class="contenedor__slider">
        <img :src="getImg()">
        <ul>
            <button class="btns__slider" v-for="num of sliderImg.length" :key="num" @click="getNum(num)" :class="setActive(num - 1)"></button>
        </ul>
    </div>
</template>

<script>
import { ref} from '@vue/reactivity';
//import { onMounted } from '@vue/runtime-core';
export default {
    name: "Slider",
    setup(){

        const imgNum = ref(0);

        const sliderImg = ref([
            "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1644608690200-home-sliderdesktop-to-2022.jpg",
            "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1644608759154-home-sliderdesktop.jpg",
            "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1645101337090-home-sliderdesktop-pepsi.jpg",
            "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1644608974760-home-sliderdesktop.jpg",
            "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1644849224268-home-sliderdesktop.jpg",
            "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1644608851851-home-sliderdesktop.jpg"
        ]);

        setInterval(() =>{
            imgNum.value++
            if(imgNum.value > 5){
                imgNum.value = 0
            }
        }, 7000)

        const getImg = () =>{
            return sliderImg.value[imgNum.value];
        }

        const getNum = (num) =>{
            imgNum.value = num -1
            console.log(imgNum.value)
        }

        const setActive = (num) =>{
            if(num == imgNum.value) return "liActive";
            return ""
        }

        return{
            sliderImg,
            getImg,
            imgNum,
            getNum,
            setActive
        }
    }
}
</script>