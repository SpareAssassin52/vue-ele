<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();
const userInfo = ref({  //直接解构结构体即可
    ...userInfoStore.info
})
const currentRole=ref(userInfo.value.role);     //记录当前身份用于提交之后的更改身份请求

const rules = {
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{1,16}$/,
            message: '昵称必须是5-16位的非空字符串',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择身份', trigger: 'blur' }
    ]
}

const roleChangeModel=ref({
    "requested_role": currentRole.value,
    "reason": ''
})

//修改个人信息
import { userInfoUpdateService } from '@/api/user.js';
import {roleChangeServiceAdd} from '@/api/roleChange.js';
import { ElMessage } from "element-plus";
const updateUserInfo = async () => {
    //首先判断身份有没有改变，改变了则发送身份变更请求
    if(userInfo.value.role!==currentRole.value){
        roleChangeModel.value.requested_role=userInfo.value.role;
        //console.log(roleChangeModel.value);
        let resultRC = await  roleChangeServiceAdd(roleChangeModel.value);
        ElMessage.success(resultRC.message!=='操作成功' ? resultRC.message : '身份身份变更请求已提交');
    }
    userInfo.value.role=currentRole.value;        //只有管理员可以修改用户身份
    let result = await userInfoUpdateService(userInfo.value);
    ElMessage.success(result.message ? result.message : '修改成功');
    //记得修改pinia中的数据
    userInfoStore.setInfo(userInfo.value);
    // console.log(userInfo.value);
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="120px" size="large">
                    <el-form-item label="登录名称">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickname">
                        <el-input placeholder="请输入用户昵称" v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input placeholder="请输入邮箱" v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="用户身份" prop="role">
                        <el-select placeholder="请选择" v-model="userInfo.role" style="width:300px">
                            <el-option label="用户" value="user"></el-option>
                            <el-option label="专家" value="expert"></el-option>
                            <el-option label="管理员" value="admin"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  v-if="userInfo.role!==currentRole" label="变更身份原因">
                        <el-input placeholder="请输入原因" v-model="roleChangeModel.reason" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>