import Main from "@/pages/Main";
import { createRouter, createWebHistory } from "vue-router";
import userPage from '@/pages/userPage';
import About from '@/pages/About';
import postIdPage from '@/pages/postIdPage';


const routes = [
    {
        path:'/',
        component: Main
    },
    {
        path:'/user',
        component: userPage
    },
    {
        path:'/about',
        component: About
    },
    {
        path:'/posts/:id',
        component: postIdPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;

