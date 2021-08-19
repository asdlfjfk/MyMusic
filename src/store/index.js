import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        song:0,
    },
    mutations:{
        changesong(state,payload) {
            state.song = payload
        },
    },
    actions:{},
    getters
})

export default store