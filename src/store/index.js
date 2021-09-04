import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        song:0,
        songset:[],
        id:0,
        playerbackid:"",
        flag:1,
        newalbumcurrent:0,

        allmvcategory:{},
        searchkeywords:""
    },
    mutations:{
        changesong(state,payload) {
            state.song = payload.res
            state.id = payload.item.data.songs[0].id
        },
        workchangesong(state,payload){
            state.song = payload.res
            state.id = payload.item.id
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
        changebackid(state,payload){
            state.playerbackid = payload
        },
        changeflag(state,payload){
            state.flag = payload
        },
        changenewalbumcurrent(state,payload){
            state.newalbumcurrent = payload
        },
        changeallmvcategory(state,payload){
            state.allmvcategory = payload
        },
        changesearchkeyword(state,payload){
            state.searchkeywords = payload
        }
    },
    actions:{},
    getters,

})

export default store