<script setup>
import { ref } from 'vue'
const passwords = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
});

//自定义校验规则
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('确认密码不能为空'));
    } else if (value !== passwords.value.new_pwd) {
        callback(new Error('两次输入的密码不一样'));
    } else {
        callback();
    }
}
//定义表单校验规则,每个元素都是个数组
const rules = {
    old_pwd: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    new_pwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度不满足要求，最少5个最大16个字符', trigger: 'blur' }
    ],
    re_pwd: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

//define updatePassword function
import { ElMessage } from 'element-plus'
import { userUpdatePasswordService } from '@/api/user.js'
import { useTokenStore } from '@/stores/token.js';
import useUserInfoStore from '@/stores/userInfo.js';
import { useRouter } from 'vue-router';
const router=useRouter();
const tokenStore = useTokenStore();  //pinia存储的token
const userInfoStore = useUserInfoStore();   //创建pinia对象
const updatePassword = async () => {
    let result = await userUpdatePasswordService(passwords.value);
    ElMessage.success(result.message ? result.message : '密码重置成功')
    //成功后需要退出登录并返回到登录界面
    //1、清空pinia中存储的token和个人信息
    tokenStore.removeToken();
    userInfoStore.removeInfo();
    //2、跳转到登录界面
    router.push('/login');
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">修改密码</div>
            </template>
        <el-form :rules="rules" :model="passwords">
            <el-form-item label="请输入旧密码" prop="old_pwd">
                <el-input v-model="passwords.old_pwd" style="width: 240px" type="password"
                    placeholder="Please input password" show-password class="input-box" />
            </el-form-item>
            <el-form-item label="请输入新密码" prop="new_pwd">
                <el-input v-model="passwords.new_pwd" style="width: 240px" type="password"
                    placeholder="Please input password" show-password class="input-box" />
            </el-form-item>
            <el-form-item label="请重新输入新密码" prop="re_pwd">
                <el-input v-model="passwords.re_pwd" style="width: 240px" type="password"
                    placeholder="Please input password" show-password />
            </el-form-item>

            <el-button type="primary" class="buttonAdjust" @click="updatePassword">重置密码</el-button>
        </el-form>
    </el-card>
</template>
<style lang="scss" scpoed>
.input-box {
    margin-left: 28px;
}

.buttonAdjust {
    margin-left: 20%
}
</style>
