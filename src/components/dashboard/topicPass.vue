<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { topicPassServiceList, topicPassServiceUpdate, topicPassServiceDelete } from "@/api/topicPass.js";
import { ElMessageBox } from 'element-plus';
//验证用户是否为管理员
import useUserInfoStore from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore();   //创建pinia对象
import { useRouter } from 'vue-router';
const router = useRouter();
const userRole=ref(true);
const checkRole=()=>{       //检查是否有管理员权限
    if(userInfoStore.info.role!=='admin'){
        userRole.value=false;
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
    topicPassList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    topicPassList();
}

//文章分类数据模型
const categorys = ref([
    {
        "id": 3,
        "category_name": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "category_name": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "category_name": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])
const topisPasses = ref([   //课题公告数据模型
    {
        "title": "exampletile1",
        "description": "descriptionExample1",
        "created_by": "creatorExample1",
        "assigned_to": "expertExample1",
        "category_name": "1",
        "batch_id": 1,
        "created_at": "2023-09-02 12:06:59"
    },
    {
        "title": "exampletile1",
        "description": "descriptionExample1",
        "created_by": "creatorExample1",
        "assigned_to": "expertExample1",
        "category_name": "1",
        "batch_id": 1,
        "created_at": "2023-09-02 12:06:59"
    },
    {
        "title": "exampletile1",
        "description": "descriptionExample1",
        "created_by": "creatorExample1",
        "assigned_to": "expertExample1",
        "category_name": "1",
        "batch_id": 1,
        "created_at": "2023-09-02 12:06:59"
    }
])

//导入类别名
import { categoryServiceListAll } from '@/api/topic';
const categoryList=async()=>{
    let result=await categoryServiceListAll();
    categorys.value=result.data;
}
categoryList();
//声明异步函数
const topicPassList = async () => {     //请求后端传回batch表的内容
    //先组装参数
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value
    }
    let result = await topicPassServiceList(params);
    //得到结果后渲染视图
    total.value = result.data.total;
    topisPasses.value = result.data.items;

    //处理数据，给数据模型扩展一个属性category_name：分类名称
    //利用categoryId来遍历'分类'数据类型的id找到其分类名
    for (let i = 0; i < topisPasses.value.length; i++) {
        for (let j = 0; j < categorys.value.length; j++) {
            if (topisPasses.value[i].category_id === categorys.value[j].category_id) {
                topisPasses.value[i].category_name = categorys.value[j].category_name;
            }
        }
    }
}
topicPassList();

//添加批次的数据模型与校验规则
//控制添加批次弹窗
const dialogVisible = ref(false)

//添加批次数据模型
const topicPassModel = reactive({
    title: ' ',
    description: '',
    created_by: '',
    assigned_to: '',
    categoryId: '',
    batch_id:''
})
//添加批次表单校验
const rules = {
    title: [
        { required: true, message: '请选择开始时间', trigger: 'blur' },
    ],
    created_at: [
        { required: true, message: '请选择结束时间', trigger: 'blur' },
    ]
}

import { ElMessage } from 'element-plus';

//定义变量，控制弹窗的标题
const title = ref('');
//展示编辑弹窗
const showDialog = (row) => {
    dialogVisible.value = true; title.value = '编辑分类';     //在函数中的const ref()参数必须要.value才可修改
    //当前编辑按钮的行中的数据copy给弹窗
    topicPassModel.title = row.title;
    topicPassModel.description=row.description;
    topicPassModel.created_by=row.created_by;
    topicPassModel.assigned_to=row.assigned_to;
    topicPassModel.category_id=row.category_id;
    topicPassModel.batch_id=row.batch_id;

    topicPassModel.pass_id = row.pass_id;
}

//编辑分类
const topicPassUpdate = async () => {
    //调用接口
    let result = await topicPassServiceUpdate(topicPassModel);

    ElMessage.success(result.message ? result.message : '修改成功');

    //刷新列表
    topicPassList();
    //隐藏弹窗 
    dialogVisible.value = false;
}

//清空批次数据模型
const clearData = () => {
    topicPassModel.title = '';
    topicPassModel.created_at = '';
    // ...

}

//删除分类
// import router from '@/router';
const deleteTopicPass = (row) => {
    const passId=row.pass_id;
    // console.log(row.pass_id);
    //提示用户  显示确认框
    ElMessageBox.confirm(
        '将会被永久删除，确认?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            console.log(passId);
            let result = await topicPassServiceDelete(passId);
            if (result.code === 0) {
                if (result.message === '操作成功') {
                    ElMessage({
                        type: 'success',
                        message: '公告删除成功',
                    })
                    //刷新列表
                    topicPassList();
                }
                else {
                    ElMessage({
                        type: 'warning',
                        message: result.ElMessage,
                    })
                    //刷新列表
                    topicPassList();
                }
            } else {
                ElMessage({
                    type: 'warning',
                    message: result.ElMessage,
                })
                //刷新列表
                topicPassList();
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
                <span>课题审核通过公告</span>
                <!-- <div class="extra">
                    <el-button type="primary"
                        @click="dialogVisible = true; title = '添加批次'; clearData()">添加批次</el-button>
                </div> -->
            </div>
        </template>
        <el-table :data="topisPasses" style="width: 100%">
            <el-table-column show-overflow-tooltip label="序号" width="100" type="index"> </el-table-column>
            <el-table-column show-overflow-tooltip label="课题题目" width="auto" prop="title"> </el-table-column>
            <el-table-column show-overflow-tooltip label="课题描述" width="auto" prop="description"> </el-table-column>
            <el-table-column show-overflow-tooltip label="课题创建人昵称" width="auto" prop="created_by"> </el-table-column>
            <el-table-column show-overflow-tooltip label="审核专家" width="auto" prop="assigned_to"> </el-table-column>
            <el-table-column show-overflow-tooltip label="类别" width="auto" prop="category_name"> </el-table-column>
            <!-- 隐藏category_id的数值，但是还可以用row访问 -->
            <el-table-column label="类别id" width="auto" prop="category_id" v-if="false"> </el-table-column>
            <el-table-column label="批次编号" width="auto" prop="batch_id"> </el-table-column>
            <el-table-column label="发布时间" prop="created_at"></el-table-column>
            <el-table-column v-if="userRole" label="操作" width="100">
                <template  #default="{ row }"> <!--row代表当前行的数据-->
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteTopicPass(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        <!-- 分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="topicPassModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="课题题目" prop="title">
                    <el-input v-model="topicPassModel.title" placeholder="请输入课题题目"></el-input>
                </el-form-item>
                <el-form-item label="课题描述" prop="description">
                    <el-input v-model="topicPassModel.description" placeholder="请输入课题描述"></el-input>
                </el-form-item>
                <el-form-item label="课题创建人昵称" prop="created_by">
                    <el-input v-model="topicPassModel.created_by" placeholder="请输入创建人昵称"></el-input>
                </el-form-item>
                <el-form-item label="审核专家" prop="assigned_to">
                    <el-input v-model="topicPassModel.assigned_to" placeholder="请输入审核专家"></el-input>
                </el-form-item>
                <el-form-item label="类别编号" prop="category_id">
                    <!-- <el-input v-model="topicPassModel.category_id" placeholder="请输入类别编号"></el-input> -->
                    <el-select placeholder="请选择" v-model="topicPassModel.category_id" style="">
                    <el-option v-for="c in categorys" :key="c.category_id" :label="c.category_name" :value="c.category_id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="批次编号" prop="batch_id">
                    <el-input v-model="topicPassModel.batch_id" placeholder="请输入批次编号"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="topicPassUpdate()"> 确认
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