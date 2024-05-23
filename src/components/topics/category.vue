<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "category_id": 3,
        "category_name": "美食",
        "description": "my",
        "created_user": 6,
        "created_at": "2023-09-02 12:06:59",
        "updated_at": "2023-09-02 12:06:59"
    },
    {
        "category_id": 4,
        "category_name": "娱乐",
        "description": "yl",
        "created_user": 6,
        "created_at": "2023-09-02 12:08:16",
        "updated_at": "2023-09-02 12:08:16"
    },
    {
        "category_id": 5,
        "category_name": "军事",
        "description": "js",
        "created_user": 6,
        "created_at": "2023-09-02 12:08:33",
        "updated_at": "2023-09-02 12:08:33"
    }
])

import { categoryServiceAdd, categoryServiceList, categoryServiceUpdate, categoryServiceDelete } from '@/api/topic.js';
//声明异步函数
const categoryList = async () => {
    let result = await categoryServiceList();
    categorys.value = result.data;
}
categoryList();

//添加分类的数据模型与校验规则
//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    category_name: '',
    description: ''
})
//添加分类表单校验
const rules = {
    category_name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    description: [
        { required: true, message: '请输入分类描述', trigger: 'blur' },
    ]
}

import { ElMessage } from 'element-plus';
//调用接口，添加表单addCategory
const addCategory = async () => {
    //调用接口
    let result = await categoryServiceAdd(categoryModel.value);
    ElMessage.success(result.message ? result.message : '添加成功');

    //再去调用获取所有文章分类的函数
    categoryList();
    dialogVisible.value = false;
}

//定义变量，控制弹窗的标题
const title = ref('');
//展示编辑弹窗
const showDialog = (row) => {
    dialogVisible.value = true; title.value = '编辑分类';     //在函数中的const ref()参数必须要.value才可修改
    //当前编辑按钮的行中的数据copy给弹窗
    categoryModel.value.category_name = row.category_name;
    categoryModel.value.description = row.description;
    //扩展id属性，之后需要转递给后台，来完成分类的修改
    categoryModel.value.category_id = row.category_id;
}

//编辑分类
const updateCategory = async () => {
    //调用接口
    let result = await categoryServiceUpdate(categoryModel.value);

    ElMessage.success(result.message ? result.message : '修改成功');

    //刷新列表
    categoryList();
    //隐藏弹窗 
    dialogVisible.value = false;
}

//清空文章类型的数据模型
const clearData = () => {
    categoryModel.value = {
        category_name: '',
        description:''
    };
}

//删除分类
import { ElMessageBox } from 'element-plus';
const deleteCategory = (row) => {
    //提示用户  显示确认框
    ElMessageBox.confirm(
        '分类将会被永久删除，确认?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async() => {
            let result = await categoryServiceDelete(row.category_id);
            ElMessage({
                type: 'success',
                message: '分类删除成功',
            })
            //刷新列表
            categoryList();
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
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true; title = '添加分类'; clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="编号" width="100" prop="category_id"> </el-table-column>
            <el-table-column label="分类名称" prop="category_name"></el-table-column>
            <el-table-column label="分类描述" prop="description"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }"> <!--row代表当前行的数据-->
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="category_name">
                    <el-input v-model="categoryModel.category_name" minlength="1" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" prop="description">
                    <el-input v-model="categoryModel.description" minlength="1"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title === '添加分类' ? addCategory() : updateCategory()"> 确认 </el-button>
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