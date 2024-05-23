<template>
  <div style="margin-top: 40px">
    <el-form :model="formData" label-width="20px" class="form">
      <!--账号-->
      <el-form-item style="margin-top: 6px">
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <div class="icon-wrapper">
              <User />
            </div>
          </el-col>
          <el-col :span="22">
            <el-input v-model="formData.username" maxlength="20" @keyup.enter.native="login(false)"
              style="width: 250px" clearable autofocus placeholder="请输入账号"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!--密码-->
      <el-form-item>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <div class="icon-wrapper">
              <Lock />
            </div>
          </el-col>
          <el-col :span="22">
            <el-input type="password" @keyup.enter.native="login(false)" v-model="formData.password" maxlength="30"
              style="width: 250px" clearable placeholder="请输入密码" show-password></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <Verify ref="verify" style="margin-left: 50px;"></Verify>
      </el-form-item>

      <el-row>
        <el-form-item>
          <div style="float: right; margin-top: -20px">
            <el-checkbox v-model="isKeep" style="height: 50px">记住密码</el-checkbox>
          </div>
        </el-form-item>


      </el-row>


      <el-form-item>
        <el-button type="primary" @click="login(false)" class="loginMain">
          <span> 登录 </span>
        </el-button>

        <el-button type="warning" @click="login(true)" class="loginMain">
          <span> 注册 </span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineExpose,ref, provide, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import Verify from "./verify.vue";
import { User, Lock } from '@element-plus/icons-vue'
const formData = ref({
  username: "",
  password: "",
  role: "user",
});

const verify=ref(null);
let loadingBtn = ref("");
let isKeep = ref(true); //记住密码
let loginState = ref(0);  //是否登录


//const isRegister = ref(false);  //标记是否为注册

const clearForm = (curRole) => {
  formData.value = {
    username: '',
    password: '',
    role: curRole
  };
};

const clickCookies = (data) => {   //记住密码后，把密码放到form中去
  formData.value = {
    username: data.username,
    password: data.password,
    role: data.role,
  };
};

//在登录函数使用store把登录成功返回的token存储起来
import { useTokenStore } from '@/stores/token.js';
//登录的数据类型公共注册的，表单校验rules也共用rules的
//登录函数login
import { userRegisterService, userLoginService } from '@/api/user.js';
import {useRouter} from 'vue-router';
const router = useRouter();
const tokenStore = useTokenStore();


const login = async (isRegister) => {   //根据点击的按钮来判断是注册还是登录
  if (verify.value != undefined && !verify.value.check()) {  //formRef.value.verify != undefined && 不知道含义
    ElMessage.warning({
      message: "验证码错误",
    });
    return;
  }
  if (formData.value.username === "") {
    ElMessage.warning({
      message: "账号不能为空",
    });
    return;
  } else if (formData.value.password === "") {
    ElMessage.warning({
      message: "密码不能为空",
    });
    return;
  }
  //登录逻辑/注册逻辑
  if(!isRegister){
    // console.log(formData);
    let result = await userLoginService(formData.value);
    ElMessage.success(result.message!='操作成功'? result.message: '登录成功');
    //把得到的token存储到pinia中
    tokenStore.setToken(result.data);
    //跳转到首页，借助路由跳转
    router.push('/');
  }
  else{ //注册逻辑
    let result = await userRegisterService(formData.value);
    ElMessage.success(result.message!='操作成功'? result.message: '注册成功');
    // console.log(result.data);
    let resultLogin = await userLoginService(formData.value);
    ElMessage.success(resultLogin.message!='操作成功'? resultLogin.message: '注册登录成功');
    //把得到的token存储到pinia中
    tokenStore.setToken(result.data);
    //跳转到首页，借助路由跳转
    router.push('/');
  }

};


// provide('clearForm', clearForm);
onMounted(() => {   //开始时重置form表单
  clearForm("user");
});

defineExpose({    //把函数暴露给外界使用
  clearForm,
});
</script>

<style>
/*登录表单的顶部*/
.el-tabs--border-card>.el-tabs__header .el-tabs__item {
  height: 60px;
  width: 100px;
  font-size: 22px;
  line-height: 60px;
  font-weight: bold;
  text-align: center;
}

/*.el-tabs, .el-tabs__header {*/
/*border-radius: 18px;*/
/*}*/
</style>
<style scoped>
.el-row {
  margin: 0;
  padding: 0;
}

.icon-wrapper {
  height: 100%;
  /* 确保图标容器高度与输入框相同 */
  display: flex;
  align-items: center;
  /* 垂直居中图标 */
}

.el-input {
  height: 40px;
  /* 或者您需要的高度 */
  vertical-align: middle;
  /* 垂直居中输入框 */
}

:deep() .form {
  margin-right: 20px;
}

:deep() .loginMain {
  color: white;
  font-size: 18px;
  width: 120px;
  border-radius: 100px;
  margin-left: 20px;
  margin-top: -10px;
}

.loginMain span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;
}

.loginMain span:after {
  font-size: 28px;
  /*  \00bb: ">>"符号  */
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: -8px;
  right: -35px;
  transition: 0.4s;
}

.loginMain:hover span {
  padding-right: 35px;
}

.loginMain:hover span:after {
  opacity: 1;
  right: 0;
}

:deep() .el-tabs {
  border-radius: 8px !important;
}

.deleteCook {
  float: right;
  height: 10px;
  width: 10px;
  margin-top: -18px;
}

.deleteCook:hover {
  transform: scale(1.2);
  font-weight: bold;
}

.circle {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: gray;
  float: left;
  margin: 1px;
}

.userIcon {
  font-size: 18px;
  float: left;
  height: 50px;
  width: 35px;
  line-height: 50px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* Adjust the height as needed */
}
</style>