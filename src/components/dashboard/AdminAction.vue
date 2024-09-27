<script setup>
import { ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus';



//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    adminActionList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    adminActionList();
}


const topisPasses = ref([   //课题公告数据模型
    {
        "action_id": 3,
        "admin_id": 6,
        "action_type": "更新用户数据",
        "created_at": "2024-05-13 16:03:13",
        "description": "用户编号：15的数据被管理员修改"
    },
    {
        "action_id": 3,
        "admin_id": 6,
        "action_type": "更新用户数据",
        "created_at": "2024-05-13 16:03:13",
        "description": "用户编号：15的数据被管理员修改"
    },
    {
        "action_id": 3,
        "admin_id": 6,
        "action_type": "更新用户数据",
        "created_at": "2024-05-13 16:03:13",
        "description": "用户编号：15的数据被管理员修改"
    }
])

//导入类别名
import { aaServiceList } from '@/api/AdminAction.js';
//声明异步函数
const adminActionList = async () => {     //请求后端传回batch表的内容
    //先组装参数
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value
    }
    let result = await aaServiceList(params);
    //得到结果后渲染视图
    total.value = result.data.total;
    topisPasses.value = result.data.items;
}
adminActionList();



</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">
                <span>管理员操作公布</span>
                <!-- <div class="extra">
                    <el-button type="primary"
                        @click="dialogVisible = true; title = '添加批次'; clearData()">添加批次</el-button>
                </div> -->
            </div>
        </template>
        <el-table :data="topisPasses" style="width: 100%">
            <el-table-column show-overflow-tooltip label="序号" width="100" type="index"> </el-table-column>
            <el-table-column show-overflow-tooltip label="操作编号" width="auto" prop="action_id"> </el-table-column>
            <el-table-column show-overflow-tooltip label="管理员编号" width="auto" prop="admin_id"> </el-table-column>
            <el-table-column show-overflow-tooltip label="操作类型" width="auto" prop="action_type"> </el-table-column>
            <el-table-column show-overflow-tooltip label="操作描述" width="auto" prop="description"> </el-table-column>
            <el-table-column show-overflow-tooltip label="操作时间" width="auto" prop="created_at"> </el-table-column>
            
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
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