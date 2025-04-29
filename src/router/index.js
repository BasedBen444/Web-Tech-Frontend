import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'mainLayout', component: () => import('@/views/MainLayout.vue'), redirect:{ name: 'home' }, children: [
            { path: '/home', name: 'home', component: () => import('@/views/Home.vue'), meta: {requiresAuth: false, title:'Home', isNavLink: true}, },
            
        ] 
    },
        { path: '/login', name: 'login', component: () => import('@/views/Login.vue'), meta: {requiresAuth: false} },
        { path: '/signup', name: 'signup', component: () => import('@/views/Signup.vue'), meta: {requiresAuth: false} },
        { path: '/signup/confirm', name: 'signup-confirm', component: () => import('@/views/SignupConfirm.vue'), meta: {requiresAuth: false} },
        { path: '/creategame/:scheduleId', name: 'creategame', component: () => import('@/views/CreateGame.vue'), meta: {requiresAuth: true} },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: {requiresAuth: false} },
    ],
})
  
export default router;