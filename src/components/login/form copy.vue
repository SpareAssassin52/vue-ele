<template>
  <div style="margin-top: 40px">
    <el-form :model="form" label-width="20px" class="form">
      <!--账号-->
      <el-form-item style="margin-top: 60px">
        <el-row>
          <el-col :span="2">
            <i class="el-icon-user"></i>
          </el-col>
          <el-col :span="22">
            <el-dropdown trigger="click" v-if="dealCookie.length > 0">
              <el-input
                v-model="form.username"
                maxlength="15"
                @keyup.enter.native="loginDone('form')"
                style="width: 300px"
                clearable
                autofocus
                placeholder="请输入账号"
              ></el-input>
              <!--用户登录过的账号-->
              <el-dropdown-menu
                :style="{
                  width: '300px',
                  marginLeft: '50px',
                  height:
                    dealCookie.length < 3
                      ? `${dealCookie.length * 50}px`
                      : '100px',
                }"
                slot="dropdown"
              >
                <el-scrollbar
                  style="height: 100%"
                  wrapStyle="overflow-x:hidden;padding-right:12px;"
                  viewStyle=""
                >
                  <el-dropdown-item
                    v-for="cookies in dealCookie"
                    :key="cookies.username"
                    @click.native="clickCookies(cookies)"
                    style="height: 50px"
                  >
                    <div>
                      <!--用户账号icon-->
                      <div class="userIcon el-icon-user-solid"></div>
                      <!--显示cookies账号密码-->
                      <div>
                        <div>{{ cookies.username }}</div>
                        <div>
                          <div
                            class="circle"
                            v-for="(item, index) in circleArr"
                            :key="index"
                          >
                            {{ item }}
                          </div>
                        </div>
                      </div>
                      <!--删除账号信息按钮-->
                      <div
                        title="删除账号信息"
                        class="deleteCook el-icon-close"
                        @click.stop="deleteCookies(cookies)"
                      ></div>
                    </div>
                  </el-dropdown-item>
                </el-scrollbar>
              </el-dropdown-menu>
            </el-dropdown>

            <el-input
              v-else
              v-model="form.username"
              maxlength="15"
              @keyup.enter.native="loginDone('form')"
              style="width: 300px"
              clearable
              autofocus
              placeholder="请输入账号"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!--密码-->
      <el-form-item>
        <el-row>
          <el-col :span="2">
            <a class="el-icon-lock"></a>
          </el-col>
          <el-col :span="22">
            <el-input
              type="password"
              @keyup.enter.native="loginDone('form')"
              v-model="form.password"
              maxlength="30"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <Verify ref="verify" style="margin-left: 50px;"></Verify>
      </el-form-item>

      <el-form-item>
        <div style="float: right; margin-top: -20px">
          <el-checkbox v-model="isKeep" style="height: 50px"
            >记住密码</el-checkbox
          >
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="loadingBtn === ''"
          type="primary"
          @click="login('form')"
          class="loginMain"
          :disabled="loginBtn"
        >
          <span> 登录 </span>
        </el-button>
        <el-button
          v-else
          @click="login('form')"
          type="primary"
          class="loginMain"
          :disabled="loginBtn"
        >
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

let form = reactive({
  username: "",
  password: "",
  role: 2,
});

let loadingBtn = ref("");
let circleArr = ref(["", "", "", "", "", ""]);
let isKeep = ref(true);
let errNum = ref(0);
let loginState = ref(0);
let time = ref("");
let loginBtn = ref(false);
let dealCookie = ref([]);

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
  if(formRef.value.verify != undefined && !formRef.value.verify.check()) {
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

const checkLogin = (formName) => {
  let _this = this;
  formRef.value.validate((valid) => {
    if (valid) {
      loadingBtn.value = "登录中 ...";
      loginBtn.value = true;
      _this.$nextTick(() => {
        // Your axios call here
      });
    }
  });
};

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
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
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
:deep() .form {
  margin-right: 20px;
}
:deep() .loginMain {
  color: white;
  font-size: 18px;
  width: 200px;
  border-radius: 100px;
  margin-left: 70px;
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
</style>