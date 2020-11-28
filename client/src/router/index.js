import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import vac from '../views/vac.vue'
import register from '../views/Register.vue'
import duty from '../views/duty.vue'
import ezen from '../views/ezenEnseraf.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/needVac',
        name: 'needVac',
        component: vac
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/rep2',
        name: 'rep2',
        component: vac
    },
    {
        path: '/rep3',
        name: 'rep3',
        component: vac
    },
    {
        path: '/rep4',
        name: 'rep4',
        component: vac
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/duty',
        name: 'duty',
        component: duty
    },
    {
        path: '/ezen',
        name: 'ezen',
        component: ezen
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router