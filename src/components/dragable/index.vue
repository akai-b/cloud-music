<template>
    <div>
        <div class="drag-wrap" ref="dragContent">
            <TransitionGroup name="fade">
                <div 
                    :draggable="item.draggable"
                    class="drag-item" 
                    :class="{moving:item.moving,'is-new':item.isNew}"
                    v-for="item,index of nodeList" 
                    :key="item.id"
                    @dragstart="bindDragEvent($event,index)"
                    @dragend="removeDragEvent($event,index)"
                    @drag="onDrag($event,index)"
                    @dragover="dragover($event,index)"
                    @dragenter="dragenter($event,index)"
                    @drop="drop($event,index)"
                    @mousedown="mousedown($event,index)"
                >
                    {{item.name}}
                </div>
            </TransitionGroup>
            
        </div>
        <button @click="delate">delet</button>
        <button @click="add">add</button>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
    type node = {name:number,moving:Boolean,[prop:string]:any}
    type event = {
            target:any,
            [prop:string]:any
        }
    let nodeList:node[]= [...Array(13)]
    let len = nodeList.length
    for(let i=0;i<len;i++){
        let id = createId()
        nodeList[i] = {id:id,name:id,moving:false,draggable:true}
    }
    let current:node|null = null
    nodeList = reactive(nodeList)
    function delate(){
        let index = Math.floor(Math.random()*nodeList.length)
        nodeList.splice(index,1)

    }
    function add(){
        let id = createId()
        let index = Math.floor(Math.random()*nodeList.length)
        nodeList.splice(index,0,{id:id,name:id,moving:false,isNew:true,draggable:true})
    }
    function createId():number{
        // do some thing
        let times = 0
        return function():number{
            let id = Math.floor(Math.random()*10000)
            let list = nodeList.filter(item=>item).map(item=>item.id)
            if(list.includes(id)){
                console.log('重复了',id,times)
                times++
                return createId()
            }else{
                return id
            }
        }()
    }
    function bindDragEvent(e:event,index:number){
        console.log('mousedown')
        current = nodeList[index]
        setTimeout(()=>{
            nodeList[index].moving = true
        })

    }
    function onDrag(e:event,index:number){
        // console.log('onDrag',e,index)
        
    }
    function dragenter(e:event,index:number){
        if(!current) return;
        let i = nodeList.findIndex(item=>item.id==(current?current.id:null))
        nodeList.splice(i,1)
        nodeList.splice(index,0,current as node)
    }
    function removeDragEvent(e:event,index:number){
        nodeList[index].moving = false
        current = null
    }
    function dragover(e:event,index:number){
        e.preventDefault()
    }
    function mousedown(e:event,index:number){
        nodeList[index].draggable = true
    }
    function drop(e:event,index:number){
        e.preventDefault()
        console.log('drop')
        nodeList[index].draggable = false
    }
    onMounted(()=>{
        let el = document.getElementsByClassName('drag-wrap')[0]
    })
</script>
<style lang="scss" scoped>
.drag-wrap{
    position: relative;
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .drag-item{
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
        width: 90px;
        margin: 5px;
        height: 60px;
        user-select: none;
        background-color: blueviolet;
        transition: all .3s;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        opacity:1;
        &.moving{
            opacity: 0.6;
            border:1px dashed skyblue
        }
        &.is-new{
            background-color: hotpink;
        }
    }
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>