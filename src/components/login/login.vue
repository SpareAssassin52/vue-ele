<script setup>
import Form from './form.vue';
import { ref } from 'vue';

//const keyLabel = ref("用户");

const flip = () => {
  //keyLabel.value=newLabel;
  let flip = document.querySelector(".el-tabs");
  flip.style.transition = "0.3s";
  // 翻转90度
  flip.style.transform = "rotateY(90deg)";
  setTimeout(() => {
    flip.style.transition = "0.2s";
    flip.style.transform = "rotateY(0)";
  }, 240);
}

const tabClick = (data) => {
  //if (data.label !== keyLabel.value)
  flip();

  if (data.label === "用户") {
    user_tab.value.clearForm("user");
    //user_tab.value.getCook
  }
  else if (data.label === "专家") {
    expert_tab.value.clearForm("expert");
  }
  else if (data.label === "管理员") {
    admin_tab.value.clearForm("admin");
  }
}
</script>
<template>
  <div id="app" class="center">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="用户">
        <Form ref="user_tab"></Form>
      </el-tab-pane>
      <el-tab-pane label="专家">
        <Form ref="expert_tab"></Form>
      </el-tab-pane>
      <el-tab-pane label="管理员">
        <Form ref="admin_tab"></Form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  /* 设置背景图片 */
  background-image: url('G:\MyProjects\mycode\JAVA\FInialThesis\vue-ele\src\assets\home.jpg');
  background-size: cover;
  background-position: center;
}

.tabs {
  width: 300px;
  height: 200px;
}

.el-tabs {
  /*3d效果*/
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  transition: 0.8s;
}
</style>