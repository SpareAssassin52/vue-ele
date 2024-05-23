<script setup>
import Form from './form.vue';
import { nextTick,inject, onMounted, ref } from 'vue';

const keyLabel = ref("用户");

const user_tab=ref(null);
const expert_tab=ref(null);
const admin_tab=ref(null);

// let clearForm=null; //获取Form中的函数
// onMounted(() => {
//   clearForm = inject('clearForm');
// });
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

const tabClick = (tab) => {
  // console.log(tab);
  // console.log(tab.props.label); 
  if (tab.props.label !== keyLabel.value){
    flip();
    keyLabel.value=tab.props.label;
  }

  nextTick(()=>{
    if (tab.props.label === "用户") {
    user_tab.value.clearForm("user");
    //user_tab.value.getCook
  }
  else if (tab.props.label === "专家") {
    expert_tab.value.clearForm("expert");
  }
  else if (tab.props.label === "管理员") {
    admin_tab.value.clearForm("admin");
  }
  });
  
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