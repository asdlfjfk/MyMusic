import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const home = () => import('../views/home/Discovermusic.vue')
const video = () => import('../views/home/Recommendvideo.vue')
const disk = () => import('../views/home/MyCloudDisk.vue')

const personality = () => import('../views/home/DiscoverChildview/personality.vue')
const playlist = () => import('../views/home/DiscoverChildview/playlist.vue')
const leader = () => import('../views/home/DiscoverChildview/leader.vue')
const singer = () => import('../views/home/DiscoverChildview/singer.vue')
const latestmusic = () => import('../views/home/DiscoverChildview/latestmusic.vue')
const songlist = () => import('../views/songlist/songlist.vue')
const singerlist = () => import('../views/singerlist/singerlist.vue')
const albumlist = () => import('../views/albumlist/albumlist.vue')
const videopage = () => import('../views/videopage/videopage.vue')
const mvpage = () => import('../views/videopage/mvpage.vue')
const recovideo = () => import('../views/home/RecommendvideoChildview/recovideo.vue')
const recomv = () => import('../views/home/RecommendvideoChildview/recomv.vue')
const allmv = () => import('../views/home/RecommendvideoChildview/allmv.vue')
const mvleader = () => import('../views/home/RecommendvideoChildview/mvleader.vue')

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
                path:'playlist',
                component:playlist
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
        component:video,
        children:[
            {
                path:'',
                redirect: 'recomv'
            },
            {
                path:'recovideo',
                component:recovideo
            },
            {
                path:'recomv',
                component:recomv
            }
        ]
    },
    {
        path:'/disk',
        component:disk
    },
    {
        path:'/songlist/:id',
        component:songlist,
    },
    {
        path:'/singerlist/:id',
        component:singerlist
    },
    {
        path:'/albumlist/:id',
        component:albumlist
    },
    {
        path:'/videopage/:id',
        component:videopage
    },
    {
        path:'/mvpage/:id',
        component:mvpage
    },
    {
        path:'/allmv',
        component:allmv
    },
    {
        path:'/mvleader',
        component:mvleader
    }
]

export default new VueRouter({
    routes,
    mode:'history',
})
