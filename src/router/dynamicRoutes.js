export const userRoute = {
    path: '/users',
    name: 'users',
    component: () => import('@/views/Users.vue'),
    meta:{
        requiresAuth: true,
        title: 'Users',
        isNavLink: true,
        roles: ['admin', 'user'],
    },
    children: [
        {path: '', name: 'usersGreeting', component: () => import('@/views/UserProfilesGreeting.vue')},
        {path:'/users/:id(\\d+)', name:'user', components: {
            default: () => import('@/views/User.vue'),
        }, 
        meta: {requiresAuth: true},
        }
    ]
}