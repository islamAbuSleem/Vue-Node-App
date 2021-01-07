import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import vac from '../views/vac.vue'
import register from '../views/Register.vue'
import duty from '../views/duty.vue'
import ezen from '../views/ezenEnseraf.vue'
import user from '../views/user.vue'
import initialApprove from '../views/initialApprove.vue'
import approve from '../views/approve.vue'
import HR from '../views/hrGroup.vue'
import userHistory from '../views/userHistory.vue'

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
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: login
    // },

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
    {
        path: '/U/:name',
        name: 'user',
        component: user,
        props: true,
    }, {
        path: '/initial-approve',
        name: 'initialapprove',
        component: initialApprove
    }, {
        path: '/approve',
        name: 'approve',
        component: approve
    },
    {
        path: '/hr-dayoff-list',
        name: 'hr-list',
        component: HR
    },
    {
        path: '/user-history',
        name: 'user-hisotry',
        component: userHistory
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router