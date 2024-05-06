import {createRouter, createWebHistory} from 'vue-router';

//导入组件

import error from '@/common/error/error.vue';
import login from '@/components/login/login.vue';
import home from '@/components/home.vue';
import dashboard from '@/components/dashboard/index.vue'
// //导入子路由需要用用到的组件
// import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
// import ArticleManageVue from '@/views/article/ArticleManage.vue'
// import UserAvatarVue from '@/views/user/UserAvatar.vue'
// import UserInfoVue from '@/views/user/UserInfo.vue'
// import UserResetPasswordVue from '@/views/user/UserResetPassword.vue';


// //定义路由关系
// const routes = [
//     {path: '/login', component: LoginVue},
//     {path: '/', component: LayoutVue, redirect:'/article/category', children:[
//         {path:'/article/category', component:ArticleCategoryVue},
//         {path:'/article/manage', component:ArticleManageVue},
//         {path:'/user/info', component:UserInfoVue},
//         {path:'/user/avatar', component:UserAvatarVue},
//         {path:'/user/resetPassword', component:UserResetPasswordVue}
//     ]}
// ]

const routes=[
    {path: '/login', component: login},
    {path: '/404', component: error},
    {path: '/', component: home, redirect: '/dashboard', children: [
        {path: '/dashboard', name: 'MainPage', component: dashboard}
    ]}
]

//创建路由器
const router = createRouter({
    routes:routes,
    history:createWebHistory()
});

//导出路由
export default router;