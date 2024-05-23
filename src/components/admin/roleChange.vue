<script setup>
import {
    Check,
    Delete
} from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { roleChangeServiceList, roleChangeServiceUpdate } from "@/api/roleChange.js";
import { ElMessageBox } from 'element-plus';
//验证用户是否为管理员
import useUserInfoStore from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore();   //创建pinia对象
import { useRouter } from 'vue-router';
const router = useRouter();
const checkRole=()=>{       //检查是否有管理员权限
    if(userInfoStore.info.role!=='admin'){
        ElMessage.error('没有管理员权限');
        router.push('/');

    }
}
checkRole();

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    roleRequestList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    roleRequestList();
}
const user_id = ref('');
const status = ref('pending');

const roleChangeRequest = ref([
    {
        "request_id": 1,
        "user_id": 10,
        "current_role": "user",
        "requested_role": "expert",
        "status": "approved",
        "reason": "身份升级了"
    },
    {
        "request_id": 1,
        "user_id": 10,
        "current_role": "user",
        "requested_role": "expert",
        "status": "approved",
        "reason": "身份升级了"
    },
    {
        "request_id": 1,
        "user_id": 10,
        "current_role": "user",
        "requested_role": "expert",
        "status": "approved",
        "reason": "身份升级了"
    }
])

const updateModel=ref({
        request_id:'',
        user_id:'',
        current_role: '',
        requested_role: '',
        status: '',
        reason: '',
})

//声明异步函数
const roleRequestList = async () => {     //请求后端传回batch表的内容
    //先组装参数
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        user_id: user_id.value? user_id.value :null,
        status: status.value,
    }
    let result = await roleChangeServiceList(params);
    //得到结果后渲染视图
    total.value = result.data.total;
    roleChangeRequest.value = result.data.items;
}
roleRequestList();

import { ElMessage } from 'element-plus';

const clearModel=()=>{
    updateModel.value.request_id='';
    updateModel.value.user_id='';
    updateModel.value.current_role='';
    updateModel.value.requested_role='';
    updateModel.value.status='';
    updateModel.value.reason='';
}

const roleDecision = (row, decision) => {
    updateModel.value.request_id=row.request_id;
    updateModel.value.user_id=row.user_id;
    updateModel.value.current_role=row.current_role;
    updateModel.value.requested_role=row.requested_role;
    updateModel.value.status=decision;
    updateModel.value.reason=row.reason;

    if(decision==='approved'){
        ElMessageBox.confirm(
            '确认更改用户身份？',
            'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
        ).then(async()=>{
            let result=roleChangeServiceUpdate(updateModel.value);
            ElMessage({
                type: 'success',
                message: result.message==='操作成功'?'请求处理已接受':result.message,
            });
            clearModel();
            roleRequestList();
        }).catch(()=>{
            ElMessage({
                type: 'info',
                message: '操作取消',
            })
        })
    }else{
        ElMessageBox.confirm('拒绝当前请求?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async()=>{
            let result=roleChangeServiceUpdate(updateModel.value);
            ElMessage({
                type: 'success',
                message: result.message==='操作成功'?'请求处理已拒绝':result.message,
            });
            clearModel();
            roleRequestList();
        }).catch(()=>{
            ElMessage({
                type: 'info',
                message: '操作取消',
            })
        })
    }

}
const statusFormatter = (row, column, cellValue) => {   //替换英文为中文显示在表格中
  switch (cellValue) {
    case 'pending':
      return '审核中';
    case 'approved':
      return '通过';
    case 'rejected':
      return '未通过';
    default:
      return cellValue;
  }
};
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">
                <span>用户身份变更请求处理</span>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="用户编号">
                <el-input v-model="user_id" placeholder="请输入用户编号"></el-input>
            </el-form-item>
            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="status" style="width:200px">
                    <el-option label="审核中" value="pending"></el-option>
                    <el-option label="通过" value="approved"></el-option>
                    <el-option label="未通过" value="rejected"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="roleRequestList()">搜索</el-button>
                <el-button @click="user_id = ''; status = 'pending'; assigned_to=''; roleRequestList()">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="roleChangeRequest" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="请求编号" width="auto" prop="request_id"> </el-table-column>
            <el-table-column label="请求用户编号" width="auto" prop="user_id"> </el-table-column>
            <el-table-column label="用户当前身份" width="auto" prop="current_role"></el-table-column>
            <el-table-column label="用户期望身份" width="auto" prop="requested_role"></el-table-column>
            <el-table-column show-overflow-tooltip label="状态" width="auto" prop="status"
                :formatter="statusFormatter"></el-table-column>
            <el-table-column show-overflow-tooltip label="请求原因" width="auto" prop="reason"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }"> <!--row代表当前行的数据-->
                    <el-button :icon="Check" circle plain type="primary"
                        @click="roleDecision(row, 'approved')"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"
                        @click="roleDecision(row, 'rejected')"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>