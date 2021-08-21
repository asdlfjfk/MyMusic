import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        song:0,
        songset:[],
        id:0,
        index:""
    },
    mutations:{
        changesong(state,payload) {
            state.song = payload.res
            state.id = payload.item.data.songs[0].id
        },
        changesong2(state,payload) {
            state.song = payload
        },
        pushallsong(state,payload){
            state.songset.push(payload)
        },
        cleansongset(state){
            state.songset = []
        },
        changeid(state,payload){
            state.id = payload
        },
        changeindex(state,payload){
            state.index = payload
        }
    },
    actions:{},
    getters
})

export default store