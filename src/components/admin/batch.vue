<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { batchServiceList, batchServiceAdd, batchServiceUpdate, batchServiceDelete } from "@/api/batch.js";
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
const pageSize = ref(3)//每页条数
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    batchList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    batchList();
}

const batches = ref([
    {
        "active_batch_id": 3,
        "start_time": "2023-09-02 12:06:59",
        "end_time": "2023-09-02 12:06:59"
    },
    {
        "active_batch_id": 4,
        "start_time": "2023-09-02 12:08:16",
        "end_time": "2023-09-02 12:08:16"
    },
    {
        "active_batch_id": 5,
        "start_time": "2023-09-02 12:08:33",
        "end_time": "2023-09-02 12:08:33"
    }
])

//声明异步函数
const batchList = async () => {     //请求后端传回batch表的内容
    //先组装参数
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value
    }
    let result = await batchServiceList(params);
    //得到结果后渲染视图
    total.value = result.data.total;
    batches.value = result.data.items;
}
batchList();

//添加批次的数据模型与校验规则
//控制添加批次弹窗
const dialogVisible = ref(false)

//添加批次数据模型
const batchModel = reactive({
    start_time: ' ',
    end_time: ' '
})
//添加批次表单校验
const rules = {
    start_time: [
        { required: true, message: '请选择开始时间', trigger: 'blur' },
    ],
    end_time: [
        { required: true, message: '请选择结束时间', trigger: 'blur' },
    ]
}

import { ElMessage } from 'element-plus';
//调用接口，添加表单batchAdd
const batchAdd = async () => {
    //调用接口
    let result = await batchServiceAdd(batchModel);
    ElMessage.success(result.message ? result.message : '添加成功');

    //再去调用获取所有文章分类的函数
    batchList();
    dialogVisible.value = false;
}

//定义变量，控制弹窗的标题
const title = ref('');
//展示编辑弹窗
const showDialog = (row) => {
    dialogVisible.value = true; title.value = '编辑分类';     //在函数中的const ref()参数必须要.value才可修改
    //当前编辑按钮的行中的数据copy给弹窗
    batchModel.start_time = row.start_time;
    batchModel.end_time = row.end_time;
    //扩展id属性，之后需要转递给后台，来完成分类的修改
    batchModel.active_batch_id = row.active_batch_id;
}

//编辑分类
const batchUpdate = async () => {
    //调用接口
    let result = await batchServiceUpdate(batchModel);

    ElMessage.success(result.message ? result.message : '修改成功');

    //刷新列表
    batchList();
    //隐藏弹窗 
    dialogVisible.value = false;
}

//清空批次数据模型
const clearData = () => {
    batchModel.start_time = '';
    batchModel.end_time = '';

}

//删除分类
// import router from '@/router';
const deleteBatch = (row) => {
    //提示用户  显示确认框
    ElMessageBox.confirm(
        '词将会被永久删除，确认?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            //首先查找 当前批次中存在课题申请表 如果有，则删除失败----已后端查找
            let result = await batchServiceDelete(row.active_batch_id);
            if (result.code === 0) {
                if (result.message === '操作成功') {
                    ElMessage({
                        type: 'success',
                        message: '批次删除成功',
                    })
                    //刷新列表
                    batchList();
                }
                else {
                    ElMessage({
                        type: 'warning',
                        message: result.ElMessage,
                    })
                    //刷新列表
                    batchList();
                }
            } else {
                ElMessage({
                    type: 'warning',
                    message: result.ElMessage,
                })
                //刷新列表
                batchList();
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除取消',
            })
        })

}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">
                <span>批次表</span>
                <div class="extra">
                    <el-button type="primary"
                        @click="dialogVisible = true; title = '添加批次'; clearData()">添加批次</el-button>
                </div>
            </div>
        </template>
        <el-table :data="batches" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="批次编号" width="100" prop="active_batch_id"> </el-table-column>
            <el-table-column label="开始时间" width="210" prop="start_time"> </el-table-column>
            <el-table-column label="结束时间" prop="end_time"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }"> <!--row代表当前行的数据-->
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteBatch(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        <!-- 分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="batchModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker v-model="batchModel.start_time" type="datetime" placeholder="请选择开始时间" />
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time">
                    <el-date-picker v-model="batchModel.end_time" type="datetime" placeholder="请选择结束时间" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title === '添加批次' ? batchAdd() : batchUpdate()"> 确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
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