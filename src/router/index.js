import {createRouter, createWebHistory} from "vue-router";

import Welcome from "@/components/WelcomeItem.vue"


import Home from "@/components/HelloWorld.vue"
import About from "@/components/TheWelcome.vue"
import Hua from "@/components/vue/HuaJava.vue"
import buju from '@/components/buju.vue'
import El from "@/components/vue/EleMent.vue"
import Top from "@/components/vue/TopBar.vue"
import NineT from "@/components/vue/NineT.vue";

const routes=[
    {path:'/',redirect:'/login'},
    {path:'/login',component:Welcome},


    {path:'/el',component:El},
    {path:'/top',component:Top},





    {path:'/buju',component:buju,
        redirect: '/hua',
    children:[
        {path: '/hua',component:Hua},
        {path:'/home',component:Home},
        {path:'/nine',component:NineT},
        {path:'/about',component:About},
    ]

    }

]

const index=createRouter({
    history:createWebHistory(),
    routes
})
export default index