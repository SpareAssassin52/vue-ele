<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';
// 导入token
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore();
//获取用户id
import useUserInfoStore from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore();   //创建pinia对象
const currentUserId=ref(''); //存储用户的身份
const isAdmin=ref(true);//是否为管理员
import { useRouter } from 'vue-router';
const router = useRouter();
//查询的专家id
const expert_id = ref('');
const getUserInfo =  () => {     //从token中获取当前用户的所有信息等信息
    //console.log(userInfoStore.info.role!=="admin");
    currentUserId.value=userInfoStore.info.user_id;
    if(userInfoStore.info.role!=="admin"){
        isAdmin.value=false;
    }
    if(userInfoStore.info.role==="user"){
        ElMessage.error("普通用户没有权限");
        router.push('/');
    }
    if(userInfoStore.info.role==="expert"){
        expert_id.value=currentUserId.value;
    }
    //console.log(isAdmin.value);
}
getUserInfo();

//专家用户数据模型
const expert_users = ref([
    {
        "user_id": 1,
        "username": "admin123",
        "nickname": "admin?",
        "email": "admin123@qq.com",
        "avatar_url": "https://zydjava.oss-cn-beijing.aliyuncs.com/7068bc35-d4a1-4ee0-815f-9aaa60ed6cc5.png",
        "role": "admin",
        "created_at": "2024-04-09 16:33:27",
        "updated_at": "2024-04-09 16:33:27"
    },
    {
        "user_id": 1,
        "username": "admin123",
        "nickname": "admin?",
        "email": "admin123@qq.com",
        "avatar_url": "https://zydjava.oss-cn-beijing.aliyuncs.com/7068bc35-d4a1-4ee0-815f-9aaa60ed6cc5.png",
        "role": "admin",
        "created_at": "2024-04-09 16:33:27",
        "updated_at": "2024-04-09 16:33:27"
    },
    {
        "user_id": 1,
        "username": "admin123",
        "nickname": "admin?",
        "email": "admin123@qq.com",
        "avatar_url": "https://zydjava.oss-cn-beijing.aliyuncs.com/7068bc35-d4a1-4ee0-815f-9aaa60ed6cc5.png",
        "role": "admin",
        "created_at": "2024-04-09 16:33:27",
        "updated_at": "2024-04-09 16:33:27"
    }

])
//文章数据模型
const topics = ref([
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "description": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "docs": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "status": "pending",
        "category_id": 2,
        "created_by":6,
        "assigned_to": 9,
        "expert_name": "专家1",
        "batch_id":1,
        "created_at": "2023-09-03 11:55:30",
        "updated_at": "2023-09-03 11:55:30"
    }
])


//文章列表数据模型
const reviews = ref([
    {
        "review_id": 18,
        "topic_id": 1,
        "expert_id": 9,
        "comments": "方案设计详细，准许通过",
        "approved": true,
        "created_at": "2024-04-27 17:56:25",
        "updated_at": "2024-04-27 17:56:25"
    },
    {
        "review_id": 18,
        "topic_id": 1,
        "expert_id": 9,
        "comments": "方案设计详细，准许通过",
        "approved": true,
        "created_at": "2024-04-27 17:56:25",
        "updated_at": "2024-04-27 17:56:25"
    },
    {
        "review_id": 18,
        "topic_id": 1,
        "expert_id": 9,
        "comments": "方案设计详细，准许通过",
        "approved": true,
        "created_at": "2024-04-27 17:56:25",
        "updated_at": "2024-04-27 17:56:25"
    }
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    reviewList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    reviewList();
}

//获取专家用户数据模型
import { userFindByRoleService } from '@/api/user.js';
const expertUserList = async () => {
    let result = await userFindByRoleService("expert");
    expert_users.value = result.data;
    // console.log(expert_users.value);
}
expertUserList();
import {  topicServiceDetail, reviewServiceList, reviewServiceUpdate, reviewServiceDelete } from '@/api/topic.js'    //导入查询分类函数
//获取文章列表数据
const reviewList = async () => {
    //先组装参数
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        expert_id: expert_id.value,
    }
    let result = await reviewServiceList(params);
    //得到结果后渲染视图
    total.value = result.data.total;
    reviews.value = result.data.items;

    //处理数据，给数据模型扩展一个属性categoryName：分类名称
    //利用categoryId来遍历'分类'数据类型的id找到其分类名
    for (let i = 0; i < reviews.value.length; i++) {
        //console.log(reviews.value[i].approved);
        let result =await topicServiceDetail(reviews.value[i].topic_id);
        //扩展模型
        reviews.value[i].topic_title=result.data.title;
    }
}
reviewList();

//抽屉组件数据模型
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const reviewModel = ref({
    review_id: '',
    topic_id: '',
    expert_id: '',
    comments: '\n',
    approved: ''
})



//添加文章
import { ElMessage } from 'element-plus';

//showDrawer,copy data from row to the drawer
//change the drawer's title, and its function varyies based on its title.
const drawertitle = ref('');
const showDrawer = (row) => {
    drawertitle.value = '编辑文章';
    reviewModel.value.review_id = row.review_id;
    reviewModel.value.topic_id = row.topic_id;
    reviewModel.value.expert_id = row.expert_id;
    reviewModel.value.comments = row.comments;
    reviewModel.value.approved = row.approved;
    visibleDrawer.value = true;
}
//clear drawer's data
const clearDrawer = () => {
    reviewModel.value.review_id = '';
    reviewModel.value.topic_id = '';
    reviewModel.value.expert_id = '';
    reviewModel.value.comments = '\n';
    reviewModel.value.approved = '';

}
//update Article
const updateReview = async () => {
    let result = await reviewServiceUpdate(reviewModel.value);
    ElMessage.success(result.data ? result.data : '更新成功');
    //disappear drawer
    visibleDrawer.value = false;
    //refresh article list
    reviewList();
}

//delete article

const deleteReview = (row) => {
    //提示用户  显示确认框
    ElMessageBox.confirm(
        '审批表将会被永久删除，确认?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await reviewServiceDelete(row.review_id);
            ElMessage({
                type: 'success',
                message: '评审表删除成功',
            })
            //刷新列表
            reviewList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除取消',
            })
        })

}
const statusFormatter = (row, column, cellValue) => {   //替换英文为中文显示在表格中
  switch (cellValue) {
    case true:
      return '通过';
    case false:
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
                <span>审核表管理</span>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
        <el-form-item label="专家编号" v-if="isAdmin">
                <el-select placeholder="请选择" v-model="expert_id" filterable style="width:200px">
                    <el-option v-for="c in expert_users" :key="c.user_id" :label="c.nickname" :value="c.user_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="reviewList()">搜索</el-button>
                <el-button @click="expert_id=''; reviewList()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="reviews" style="width: 100%">
            <el-table-column label="序号" width="auto" type="index"> </el-table-column>
            <el-table-column show-overflow-tooltip label="申请表题目" width="auto" prop="topic_title"></el-table-column>
            <el-table-column label="审核表编号" width="auto" prop="review_id"></el-table-column>
            <el-table-column label="专家编号" prop="expert_id"></el-table-column>
            <el-table-column show-overflow-tooltip label="审批评语" prop="comments"> </el-table-column>
            <el-table-column label="是否通过" prop="approved" :formatter="statusFormatter"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDrawer(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteReview(row)"></el-button>
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
        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" :title="drawertitle" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="reviewModel" label-width="100px">
                <el-form-item label="审核表编号">
                    <el-input v-model="reviewModel.review_id" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="专家编号">
                    <el-input v-model="reviewModel.expert_id" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="审批评语">
                    <!-- 富文本编辑器 -->
                    <div class="editor"><quill-editor theme="snow" v-model:content="reviewModel.comments"
                            contentType="html">
                        </quill-editor></div>
                </el-form-item>
                <el-form-item label="是否通过">
                    <el-select placeholder="请选择" v-model="reviewModel.approved">
                        <el-option label="通过" value="true"></el-option>
                        <el-option label="未通过" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click="updateReview()">更新审批结果表</el-button>
                    <el-button type="info"
                        @click="visibleDrawer = false; clearDrawer();">取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
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

.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>