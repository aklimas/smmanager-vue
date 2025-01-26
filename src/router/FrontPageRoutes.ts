const FrontPageRoutes = {
    path: '/',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'FrontPage',
            path: '',
            meta: {
                requiresAuth: false
            },
            component: () => import('@/views/front-page/index.vue'),
        },
    ]
}

export default FrontPageRoutes;