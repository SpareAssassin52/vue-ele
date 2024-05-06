<template>
  <div style="margin-top: 40px">
    <el-form :model="form" label-width="20px" class="form">
      <!--账号-->
      <el-form-item style="margin-top: 6px">
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <div class="icon-wrapper">
              <User />
            </div>
          </el-col>
          <el-col :span="22">
            <el-input v-model="form.username" maxlength="20" @keyup.enter.native="loginDone('form')"
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
            <el-input type="password" @keyup.enter.native="loginDone('form')" v-model="form.password" maxlength="30"
              style="width: 250px" clearable placeholder="请输入密码" show-password></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <Verify v-bind:ref="verify" style="margin-left: 50px;"></Verify>
      </el-form-item>

      <el-row>
        <el-form-item>
          <div style="float: right; margin-top: -20px">
            <el-checkbox v-model="isKeep" style="height: 50px">记住密码</el-checkbox>
          </div>
        </el-form-item>


      </el-row>


      <el-form-item>
        <el-button v-if="loadingBtn === ''" type="primary" @click="login('form')" class="loginMain"
          :disabled="loginBtn">
          <span> 登录 </span>
        </el-button>
        <el-button v-else @click="login('form')" type="primary" class="loginMain" :disabled="loginBtn">
          {{ loadingBtn }}
        </el-button>

        <el-button v-if="loadingBtn === ''" type="warning" @click="login('form')" class="loginMain"
          :disabled="loginBtn">
          <span> 注册 </span>
        </el-button>
        <el-button v-else @click="login('form')" type="warning" class="loginMain" :disabled="loginBtn">
          {{ loadingBtn }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import Verify from "./verify.vue";
import { User, Lock } from '@element-plus/icons-vue'
let form = reactive({
  username: "",
  password: "",
  role: "user",
});

const verify=ref(null);

let loadingBtn = ref("");
let circleArr = ref(["", "", "", "", "", ""]);
let isKeep = ref(true);
let errNum = ref(0);
let loginState = ref(0);
let time = ref("");
let loginBtn = ref(false);
let dealCookie = ref([]);
const isRegister = ref(false);  //标记是否为注册

const clearForm = (role) => {
  form = reactive({
    username: "",
    password: "",
    role,
  });
};

const clickCookies = (data) => {
  form = reactive({
    username: data.username,
    password: data.password,
    role: data.role,
  });
};

const loginDone = (formName) => {
  if (!loginBtn.value) {
    login(formName);
  }
};

const login = (formName) => {
  if (!verify.value.check()) {  //formRef.value.verify != undefined && 不知道含义
    ElMessage.warning({
      message: "验证码错误",
    });
    return;
  }
  if (form.username === "") {
    ElMessage.warning({
      message: "账号不能为空",
    });
  } else if (form.password === "") {
    ElMessage.warning({
      message: "密码不能为空",
    });
  } else {
    loginState.value++;
    if (loginState.value === 1) {
      checkLogin(formName);
    }
  }
};

const checkLogin = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    loadingBtn.value = "登录中 ...";
    loginBtn.value = true;
    await nextTick(() => {
      // Your axios call here
    });
  }
}

const click = (_this, data) => {
  // Your logic here
};

const errDone = () => {
  // Your logic here
};

const getCookies = () => {
  // Your logic here
};

const deleteCookies = (data) => {
  // Your logic here
};

onMounted(() => {
  getCookies();
  clearForm(2);
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