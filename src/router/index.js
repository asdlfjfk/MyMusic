import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const home = () => import('../views/home/Discovermusic.vue')
const video = () => import('../views/home/Recommendvideo.vue')
const disk = () => import('../views/home/MyCloudDisk.vue')

const personality = () => import('../views/home/DiscoverChildview/personality.vue')
const songlist = () => import('../views/home/DiscoverChildview/songlist.vue')
const leader = () => import('../views/home/DiscoverChildview/leader.vue')
const singer = () => import('../views/home/DiscoverChildview/singer.vue')
const latestmusic = () => import('../views/home/DiscoverChildview/latestmusic.vue')
const Songlist = () => import('../views/songlist/songlist.vue')

const routes = [
    {
        path:'',
        redirect:'/home',
    },
    {
        path:'/home',
        component: home,
        children:[
            {
                path:'',
                redirect: 'personal'
            },
            {
                path:'personal',
                component:personality
            },
            {
                path:'songlist',
                component:songlist
            },
            {
                path:'leader',
                component:leader
            },
            {
                path:'singer',
                component:singer
            },
            {
                path:'latestmusic',
                component:latestmusic
            },
        ]
    },
    {
        path:'/video',
        component:video
    },
    {
        path:'/disk',
        component:disk
    },
    {
        path:'/songlist/:id',
        component:Songlist,
    }
]

export default new VueRouter({
    routes,
    mode:'history',
})
