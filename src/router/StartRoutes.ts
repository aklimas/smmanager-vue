const StartRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'EmptyAccount',
            path: '/welcome',
            meta: {
                roles: ['ROLE_USER'],
            },
            component: () => import('@/views/core/dashboards/EmptyAccount.vue'),
        },
        {
            name: 'ConfigureStep1',
            path: '/configure/step1',
            meta: {
                roles: ['ROLE_USER'],
            },
            component: () => import('@/views/core/dashboards/steps/ConfigureAccount.vue'),
        },
        {
            name: 'ConfigureStep2',
            path: '/configure/step2',
            meta: {
                roles: ['ROLE_USER'],
            },
            component: () => import('@/views/core/dashboards/steps/SelectSocialMedia.vue'),
        },
        {
            name: 'ConfigureStep3',
            path: '/configure/step3',
            meta: {
                roles: ['ROLE_USER'],
            },
            component: () => import('@/views/core/dashboards/steps/ConfigureSocialMedia.vue'),
        },
        {
            name: 'ConfigureStep4',
            path: '/configure/step4',
            meta: {
                roles: ['ROLE_USER'],
            },
            component: () => import('@/views/core/dashboards/steps/SelectPackage.vue'),
        },
        {
            name: 'ConfigureStep5',
            path: '/configure/step4',
            meta: {
                roles: ['ROLE_USER'],
            },
            component: () => import('@/views/core/dashboards/steps/AddPaymentMethod.vue'),
        },
       
    ]
};

export default StartRoutes;
