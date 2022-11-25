import { defineStore } from 'pinia';
import state from './state'
export const useStore = defineStore('main',{
    state:()=>state,
    getters:{

    },
    actions:{
        
    }
})