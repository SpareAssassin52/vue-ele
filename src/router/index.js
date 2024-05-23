import {createRouter, createWebHistory} from 'vue-router';

//导入组件

import error from '@/common/error/error.vue';
import login from '@/components/login/login.vue';
import home from '@/components/home.vue';
import allUsers from '@/components/admin/allUsers.vue';
import batch from '@/components/admin/batch.vue';
import category from '@/components/topics/category.vue';
import UserInfo from '@/components/users/UserInfo.vue';
import UserAvatar from '@/components/users/UserAvatar.vue';
import UserResetPassword from '@/components/users/UserResetPassword.vue';
import topics from '@/components/topics/topics.vue'
import topicPass from '@/components/dashboard/topicPass.vue';
import adminAction from '@/components/dashboard/AdminAction.vue';
import roleChange from '@/components/admin/roleChange.vue';
import assign from '@/components/admin/assign.vue';
import reviewing from '@/components/expert/reviewing.vue';
import reviewManage from '@/components/expert/reviewManage.vue';
import topicStatistic from '@/components/analysis/topicStatistic.vue';
import printPDF from "@/components/topics/printPDF.vue";

const routes=[
    {path: '/login', component: login},
    {path: '/404', component: error},
    {path: '/', component: home, redirect: '/topics', children: [
        {path: '/admin/batch', component: batch, meta: { requireAuth: true }}
        ,{path: '/user/topicCategory', component: category, meta: { requireAuth: true }}
        ,{path: '/user/info', component: UserInfo, meta:{requireAuth: true}}
        ,{path: '/user/avatar', component: UserAvatar, meta:{requireAuth: true}}
        ,{path: '/user/resetPassword', component: UserResetPassword, meta:{requireAuth: true}}
        ,{path: '/topics', component: topics, meta:{requireAuth: true}}
        ,{path: '/topics/all', component: topics, meta:{requireAuth: true}}
        ,{path: '/topicPass', component: topicPass, meta:{requireAuth: true}}
        ,{path: '/admin/allUsers', component: allUsers, meta:{requireAuth: true}}
        ,{path: '/adminAction', component: adminAction, meta:{requireAuth: true}}
        ,{path: '/admin/roleChange', component: roleChange, meta:{requireAuth: true}}
        ,{path: '/admin/assign', component: assign, meta:{requireAuth: true}}
        ,{path: '/expert/reviewing', component: reviewing, meta:{requireAuth: true}}
        ,{path: '/expert/revieManage', component: reviewManage, meta:{requireAuth: true}}
        ,{path: '/analysis/topicStatistic', component: topicStatistic, meta:{requireAuth: true}}
        ,{path: '/topics/printPDF', component: printPDF, meta:{requireAuth: true}}
    ]}
    
]

//创建路由器
const router = createRouter({
    routes:routes,
    history:createWebHistory()
});

//导出路由
export default router;