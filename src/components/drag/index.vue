<template>
    <ul class="drag-wrap clear" ref="dragContent">
        <li 
            v-for="item,index of nodeList" 
            :key="item.name" 
        >
            {{item.name}}
        </li>
    </ul>
</template>
<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import Sortable from '@/hooks/useSortable'
    type node = {name:number,moving:Boolean,[prop:string]:any}
    let nodeList:node[]
    nodeList = reactive([
        {name:111,moving:false},
        {name:2,moving:false},
        {name:3,moving:false},
        {name:4,moving:false},
        {name:5,moving:false},
        {name:6,moving:false},
        {name:7,moving:false},
        {name:8,moving:false},
        {name:9,moving:false},
        {name:10,moving:false},
        {name:11,moving:false},
        {name:12,moving:false},
        {name:13,moving:false},
    ])
    onMounted(()=>{
        let el = document.getElementsByClassName('drag-wrap')[0]
        console.log(el)
        new Sortable(el)
    })
</script>
<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}
li{
    nodeList-style: none;
}
.drag-wrap{
    position: relative;
    margin: auto;
    width: 100%;
}
.drag-wrap .drag-item{
    transition: unset;
    z-index: 2;
}
.drag-wrap li{
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
    position: absolute;
    width: 90px;
    margin: 5px;
    height: 60px;
    user-select: none;
    background-color: blueviolet;
    transition: left 0.3s ease-in-out,
                top 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
</style>