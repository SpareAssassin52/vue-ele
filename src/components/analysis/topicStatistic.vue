<script setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
import { ref } from 'vue';

//课题表总数
const totalTopics = ref(111111);
//课题表仍然在申请的个数
const pendingTopics = ref(123456);
//课题表已经完成审核的个数
const passedTopcis = ref(321456);
//本月提交的申请表个数
const thisMonthTopics=ref(123123);
//用户创建的所有分类个数
const totalcategorys=ref(321321);

import {analysisServiceTotalTopics, analysisServicePendingTopics, analysisServicePassedTopics, analysisServiceThisMonthTopics, analysisServiceTotalCategorys} from '@/api/analysis.js';
const getData=async()=>{
  let resultTotalTopics=await analysisServiceTotalTopics();
  totalTopics.value=resultTotalTopics.data;
  let resultPendingTopics= await analysisServicePendingTopics();
  pendingTopics.value=resultPendingTopics.data;
  let resultPassedTopics=await analysisServicePassedTopics();
  passedTopcis.value=resultPassedTopics.data;
  let resultThisMonthTopics=await analysisServiceThisMonthTopics();
  thisMonthTopics.value=resultThisMonthTopics.data;
  let resultTotalCategorys = await analysisServiceTotalCategorys();
  totalcategorys.value=resultTotalCategorys.data;
}
getData();
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header" style=";font-size: 16pt;">
        <span>课题申请统计一览</span>
      </div>
    </template>

    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="totalTopics">
            <template #title>
              <div style="display: inline-flex; align-items: center; font-size: 14pt;">
                您申请课题的总数为
                <el-tooltip effect="dark" content="用户的目前的所有课题申请表" placement="top">
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="pendingTopics">
            <template #title>
              <div style="display: inline-flex; align-items: center;font-size: 14pt;">
                目前仍然在审核的课题数量为
                <el-tooltip effect="dark" content="课题申请表状态为审核中" placement="top">
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="passedTopcis" title="passedTopcisSC">
            <template #title>
              <div style="display: inline-flex; align-items: center ;font-size: 14pt;">
                目前审核结束的课题申请表的数量为
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="thisMonthTopics" title="thisMonthTopicsSC">
            <template #title>
              <div style="display: inline-flex; align-items: center ;font-size: 14pt;">
                本月中提交的课题申请表数量为
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="totalcategorys">
            <template #title>
              <div style="display: inline-flex; align-items: center ;font-size: 14pt;">
                总共创建的课题分类有
                <el-tooltip effect="dark" content="用户目前所创建的所有课题分类" placement="top">
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>


<style lang="scss" scoped>
.page-container {
  min-height: auto;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}
</style>