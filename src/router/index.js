import {createRouter, createWebHashHistory} from "vue-router";
// import HelloWorld from "@/components/HelloWorld.vue";
import Home from "@/views/Home.vue";
import ThreeJs from "@/views/ThreeJs.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/threejs',
        name: 'threejs',
        component: ThreeJs
    }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router
