export const userRoute = {
    path: '/users',
    name: 'users',
    component: () => import('@/views/Users.vue'),
    meta:{
        requiresAuth: true,
        title: 'Users',
        isNavLink: true,
        roles: ['admin'],
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

export const signupRoute = { 
    path: '/signup', 
    name:'signup', 
    component: () => import('@/views/Signup.vue'), 
    meta: {requiresAuth: false, title:'Sign Up', isNavLink: true}
}