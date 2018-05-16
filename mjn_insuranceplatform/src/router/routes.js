// 首页
const Home = () => import(/* webpackChunkName: "home" */'@/views/home/index.vue');
// 成人
const Adult = () => import(/* webpackChunkName: "adult" */'@/views/adult/index.vue');
// 少儿
const Children = () => import(/* webpackChunkName: "children" */'@/views/children/index.vue');
// 父母
const Parent = () => import(/* webpackChunkName: "parent" */'@/views/parent/index.vue');
// 出行
const Travel = () => import(/* webpackChunkName: "travel" */'@/views/travel/index.vue');
// 秘籍
const Cheats = () => import(/* webpackChunkName: "cheats" */'@/views/cheats/index.vue');
// 登录
const Login = () => import(/* webpackChunkName: "cheats" */'@/views/login/index.vue');
// 注册
const Register = () => import(/* webpackChunkName: "cheats" */'@/views/register/index.vue');

// 成人
const Contrast = () => import(/* webpackChunkName: "contrast" */'@/views/contrast/index.vue');

const routes = [
    {
        path: '/home',
        alias: '/',
        meta: {
            title: '首页',
            index: 0
        },
        component: Home
    },
    {
        path: '/adult',
        meta: {
            title: '成人',
            index: 1
        },
        component: Adult
    },
    {
        path: '/children',
        meta: {
            title: '少儿',
            index: 2
        },
        component: Children
    },
    {
        path: '/parent',
        meta: {
            title: '父母',
            index: 3
        },
        component: Parent
    },
    {
        path: '/travel',
        meta: {
            title: '我的保险',
            index: 4
        },
        component: Travel
    },
    {
        path: '/cheats',
        meta: {
            title: '秘籍',
            index: 5
        },
        component: Cheats
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        path: '/register',
        meta: {
            title: '注册'
        },
        component: Register
    },
    {
        path: '/contrast',
        meta: {
            title: '对比'
        },
        component: Contrast
    }
]

export default routes;