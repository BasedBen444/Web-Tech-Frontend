import { createRouter, createWebHistory } from 'vue-router'
import { signupRoute } from './dynamicRoutes'
import { isAuthenticated } from '@/apis/auth.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'mainLayout', component: () => import('@/views/MainLayout.vue'), redirect:{ name: 'home' }, children: [
            { path: '/home', name: 'home', component: () => import('@/views/Home.vue'), meta: {requiresAuth: false, title:'Home', isNavLink: true}, },
            
        ] 
    },
        { path: '/login', name: 'login', component: () => import('@/views/Login.vue'), meta: {requiresAuth: false} },
        { 
            path: '/signup', 
            name:'signup', 
            component: () => import('@/views/Signup.vue'), 
            meta: {requiresAuth: false, requiresGuest: true, title:'Sign Up', isNavLink: true}
        }, 
        { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: {requiresAuth: false} },
    ],
})
  
export default router;