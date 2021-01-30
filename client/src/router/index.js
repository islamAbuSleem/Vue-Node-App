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
import topManager from '../views/topManagerApprove.vue'
import userHistory from '../views/userHistory.vue'
import HrDashboard from '../views/hrDashboard.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)


const userinfo = JSON.parse(localStorage.getItem('userInfo'))

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/needVac',
        name: 'needVac',
        component: vac,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/create-user',
        name: 'register',
        component: register,
        meta: {
            requiresAuth: true,
            team: 'HR'
        },
        beforeEnter: (to, from, next) => {

            if (to.matched.some(record => record.meta.team)) {
                if (userinfo.team == 'HR') {
                    next()
                } else {
                    next({ name: 'user', params: { name: userinfo.name } })
                }
            } else {
                next()
            }
        }
    },
    {
        path: '/duty',
        name: 'duty',
        component: duty,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/ezen',
        name: 'ezen',
        component: ezen,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/U/:name',
        name: 'user',
        component: user,
        props: true,
        meta: {
            requiresAuth: true
        },
    }, {
        path: '/initial-approve',
        name: 'initialapprove',
        component: initialApprove,
        meta: {
            requiresAuth: true,
            role: 'Team Leader'
        },
        beforeEnter: (to, from, next) => {

            if (to.matched.some(record => record.meta.role)) {
                if (userinfo.role == 'Team Leader') {
                    next()
                } else {
                    next({ name: 'user', params: { name: userinfo.name } })
                }
            } else {
                next()
            }
        }
    },
    {
        path: '/approve',
        name: 'approve',
        component: approve,
        meta: {
            requiresAuth: true,
            role: 'Manager'
        },
        beforeEnter: (to, from, next) => {

            if (to.matched.some(record => record.meta.role)) {
                if (userinfo.role == 'Manager') {
                    next()
                } else {
                    next({ name: 'user', params: { name: userinfo.name } })
                }
            } else {
                next()
            }
        }
    }, {
        path: '/hr-dayoff-list',
        name: 'hr-list',
        component: HR,
        meta: {
            requiresAuth: true,
            team: 'HR'
        },
        beforeEnter: (to, from, next) => {

            if (to.matched.some(record => record.meta.team)) {
                if (userinfo.team == 'HR') {
                    next()
                } else {
                    next({ name: 'user', params: { name: userinfo.name } })
                }
            } else {
                next()
            }
        }
    }, {
        path: '/user-history',
        name: 'user-hisotry',
        component: userHistory
    }, {
        path: '/sector-manager-approve',
        name: 'topManager',
        component: topManager,
        meta: {
            requiresAuth: true,
            role: 'Top Manager',
            dept: 'Sector'
        },
        beforeEnter: (to, from, next) => {

            if (to.matched.some(record => (record.meta.role, record.meta.dept))) {
                if (userinfo.role == 'Manager' && userinfo.dept == 'Sector') {
                    next()
                } else {
                    next({ name: 'user', params: { name: userinfo.name } })
                }
            } else {
                next()
            }
        }
    }, {
        path: '/hr-dashboard',
        name: 'HrDashboard',
        component: HrDashboard,
        meta: {
            requiresAuth: true,
            role: 'Manager',
            team: 'HR'
        },
        beforeEnter: (to, from, next) => {

            if (to.matched.some(record => (record.meta.role, record.meta.team))) {
                if (userinfo.role == 'Manager' && userinfo.team == 'HR') {
                    next()
                } else {
                    next({ name: 'user', params: { name: userinfo.name } })
                }
            } else {
                next()
            }
        }

    },
    {
        path: "*",
        component: PageNotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('login_token') == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router