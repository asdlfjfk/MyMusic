import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        songid:0
    },
    mutations:{
        changesong(state,payload) {
            state.songid = payload
        }
    },
    actions:{},
})

export default store