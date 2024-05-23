<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom,
    Expand,
    CaretRight,
    Files,
    TrendCharts,
    Monitor
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref} from 'vue';

import { userInfoService } from '@/api/user';            
import { useTokenStore } from '@/stores/token.js';
import useUserInfoStore from '@/stores/userInfo.js';
const tokenStore = useTokenStore();  //pinia存储的token
const userInfoStore = useUserInfoStore();   //创建pinia对象
const userRole=ref(''); //存储用户的身份
const getUserInfo = async () => {     //从token中获取当前用户的所有信息等信息
    let result = await userInfoService();
    userInfoStore.setInfo(result.data);
    if(result.data.role==='user'){userRole.value='用户';}
    else if(result.data.role==='expert'){userRole.value='专家'}
    else if(result.data.role==='admin'){userRole.value='管理员'}
    //console.log(userRole);
}
getUserInfo();

//下拉条目被点击后，调用得的函数
import { useRouter } from 'vue-router';
const router = useRouter();
const handleCommand = (command) => {
//判断指令
if (command === 'logout') {
        //退出登录
        //提示用户  显示确认框
        ElMessageBox.confirm(
            '确认退出?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(async () => {
                //1、清空pinia中存储的token和个人信息
                tokenStore.removeToken();
                userInfoStore.removeInfo();
                //2、跳转到登录界面
                router.push('/login');
                ElMessage({
                    type: 'success',
                    message: '退出登录成功',
                })

            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '退出登录取消',
                })
            })
    } else {
        //router
        router.push('/user/' + command);
    }
}

</script>
<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <!-- element plus的菜单标签 -->
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Management />
                        </el-icon>
                        <span>用户课题处理</span>
                    </template>
                    <el-menu-item index="/topics">
                        <el-icon>
                            <Files />
                        </el-icon>
                        <span>课题管理</span>
                    </el-menu-item>
                    <el-menu-item index="/user/topicCategory">
                        <el-icon>
                            <Folder />
                        </el-icon>
                        <span>课题分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="/analysis/topicStatistic">
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>课题申请表统计数据</span>
                    </el-menu-item>
                    <el-menu-item index="/topics/printPDF">
                        <el-icon><Document /></el-icon>
                        <span>打印课题审核结果</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>专家审核表</span>
                    </template>
                    <el-menu-item index="/expert/reviewing">
                        <el-icon>
                            <Promotion />
                        </el-icon>
                        <span>课题申请一览</span>
                    </el-menu-item>
                    <el-menu-item index="/expert/revieManage">
                        <el-icon>
                            <Memo />
                        </el-icon>
                        <span>审核表一览</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <Monitor />
                        </el-icon>
                        <span>管理员操作</span>
                    </template>
                    <el-menu-item index="/admin/allUsers">
                        <el-icon>
                            <Guide />
                        </el-icon>
                        <span>管理员用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/topics/all">
                        <el-icon>
                            <Grid />
                        </el-icon>
                        <span>课题申请表管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/batch">
                        <el-icon>
                            <Grid />
                        </el-icon>
                        <span>批次操作</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/assign">
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <span>专家分配</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/roleChange">
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <span>身份修改</span>
                    </el-menu-item>
                </el-sub-menu>



                <!-- <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>数据统计</span>
                    </template>
                    
                    <el-menu-item index="">
                        <el-icon>
                            <CaretRight />
                        </el-icon>
                        <span>审批通过时间情况</span>
                    </el-menu-item>
                </el-sub-menu> -->

                <el-menu-item index="/topicPass">
                    <el-icon>
                        <Expand />
                    </el-icon>
                    <span>课题通过公告</span>
                </el-menu-item>
                <el-menu-item index="/adminAction">
                    <el-icon>
                        <Monitor />
                    </el-icon>
                    <span>管理员操作公布</span>
                </el-menu-item>

                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>修改密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>欢迎您：{{ userRole }}<strong>{{ userInfoStore.info.nickname }}</strong></div>
                <!-- 下拉菜单 -->
                <!-- command: 条目被点击后会触发，在事件函数上可以声明一个参数，接受条目对应的指令 -->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.avatar_url?userInfoStore.info.avatar_url:avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">修改密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div> -->
                <router-view :key="$route.path"></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>教育科研课题评审系统 ©2024 Created by 东东</el-footer>
        </el-container>
    </el-container>
</template>
<style lang="scss" scoped>
.el-aside {
    background-color: #add8e6;
    /* 这是淡蓝色的十六进制代码 */
}

.el-container {
    width: 100%;
    height: 100%;
}

.el-dropdown {
    float: right;
}
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 100px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>