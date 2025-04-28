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

export const createScheduleRoute = { 
    path: '/create-schedule',
    name: 'createSchedule',
    component: () => import('@/views/CreateSchedule.vue'),
    meta:{
        requiresAuth: true,
        title: 'Create Schedule',
        isNavLink: true,
        roles: ['admin'],
    },
}

export const viewScheduleRoute = {
    path: '/schedules',
    name: 'schedules',
    component: () => import('@/views/Schedules.vue'),
    meta:{
        requiresAuth: true,
        title: 'Schedules',
        isNavLink: true,
        roles: ['admin', 'user'],
    },
    children: [
        {path: '', name: 'schedulesGreeting', component: () => import('@/views/SchedulesGreeting.vue')},
        {path:'/schedules/:id(\\d+)', name:'schedule', components: {
            default: () => import('@/views/Schedule.vue'),
        }, 
        meta: {requiresAuth: true},
        }
    ]
}

export const inviteRoute = {
    path: '/invite',
    name: 'invite',
    isNavLink: true,
    component: () => import('@/views/Invite.vue'),
    meta:{
        requiresAuth: true,
        title: 'Invite Crew',
        isNavLink: true,
        roles: ['admin'],
    },
}