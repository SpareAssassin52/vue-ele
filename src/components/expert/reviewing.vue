<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';
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
const getUserInfo =  () => {     //从token中获取当前用户的所有信息等信息
    //console.log(userInfoStore.info.role!=="admin");
    currentUserId.value=userInfoStore.info.user_id;
    if(userInfoStore.info.role==="user"){
        ElMessage.error("普通用户没有权限");
        router.push('/');
    }
    //console.log(isAdmin.value);
}
getUserInfo();

//批次编号数据模型
const batchs = ref([
    {
        "active_batch_id": 1,
        "start_time": "2024-04-25 16:40:05",
        "end_time": "2024-05-25 19:40:05"
    },
    {
        "active_batch_id": 2,
        "start_time": "2024-05-25 16:40:05",
        "end_time": "2024-06-25 16:40:05"
    },
    {
        "active_batch_id": 4,
        "start_time": "2024-05-09 19:01:49",
        "end_time": "2024-05-30 00:00:00"
    }
])
//专家用户数据模型
const expert_users=ref([
    {
        "user_id":1,
        "username": "admin123",
        "nickname": "admin?",
        "email": "admin123@qq.com",
        "avatar_url": "https://zydjava.oss-cn-beijing.aliyuncs.com/7068bc35-d4a1-4ee0-815f-9aaa60ed6cc5.png",
        "role": "admin",
        "created_at": "2024-04-09 16:33:27",
        "updated_at": "2024-04-09 16:33:27"
    },
    {
        "user_id":1,
        "username": "admin123",
        "nickname": "admin?",
        "email": "admin123@qq.com",
        "avatar_url": "https://zydjava.oss-cn-beijing.aliyuncs.com/7068bc35-d4a1-4ee0-815f-9aaa60ed6cc5.png",
        "role": "admin",
        "created_at": "2024-04-09 16:33:27",
        "updated_at": "2024-04-09 16:33:27"
    },
    {
        "user_id":1,
        "username": "admin123",
        "nickname": "admin?",
        "email": "admin123@qq.com",
        "avatar_url": "https://zydjava.oss-cn-beijing.aliyuncs.com/7068bc35-d4a1-4ee0-815f-9aaa60ed6cc5.png",
        "role": "admin",
        "created_at": "2024-04-09 16:33:27",
        "updated_at": "2024-04-09 16:33:27"
    }
    
])
//文章分类数据模型
const categorys = ref([
    {
        "id": 3,
        "category_name": "美食",
        "description": "my",
        "created_user":1,
        "created_at": "2023-09-02 12:06:59",
        "updated_at": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "category_name": "娱乐",
        "description": "yl",
        "created_user":1,
        "created_at": "2023-09-02 12:08:16",
        "updated_at": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "category_name": "军事",
        "description": "js",
        "created_user":1,
        "created_at": "2023-09-02 12:08:33",
        "updated_at": "2023-09-02 12:08:33"
    }
])

//用户搜索时选中的分类id
const category_id = ref('');
//用户搜索时选中的发布状态
const status = ref('pending');
//用户搜索时显示的专家id
const assigned_to=ref(currentUserId.value);
//管理员搜索的创建用户id
const created_by=ref('');
//搜索的批次编号
const batch_id=ref('');
//搜索时的标题关键字
const titleKey=ref('');

//文章列表数据模型
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
    },
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
    },
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
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    articleList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    articleList();
}


//获取批次数据模型
import {batchServiceListNow} from '@/api/batch.js';
const BatchListNowThen=async()=>{
    let result= await batchServiceListNow();
    batchs.value=result.data; 
}
BatchListNowThen();
//获取分类数据模型
import { categoryServiceListAll , topicServiceReview, reviewServiceAdd } from '@/api/topic.js'   //导入查询分类函数
const CategoryList = async () => {
    let result = await categoryServiceListAll();
    categorys.value = result.data;
}
CategoryList();
//获取专家用户数据模型
import {userFindByRoleService} from '@/api/user.js';
const expertUserList=async()=>{
    let result = await userFindByRoleService("expert");
    expert_users.value=result.data;
    // console.log(expert_users.value);
}
expertUserList();
//获取文章列表数据
const articleList = async () => {
    //先组装参数
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: status.value,
        assigned_to: currentUserId.value,
        category_id: category_id.value ? category_id.value : null,
        created_by: created_by.value? created_by.value: null,
        batch_id: batch_id.value? batch_id.value: null, 
        titleKey: titleKey.value?titleKey.value: null,
    }
    let result = await topicServiceReview(params);
    //得到结果后渲染视图
    total.value = result.data.total;
    topics.value = result.data.items;

    //处理数据，给数据模型扩展一个属性category_name：分类名称
    //利用category_id来遍历'分类'数据类型的id找到其分类名
    for (let i = 0; i < topics.value.length; i++) {
        for (let j = 0; j < categorys.value.length; j++) {
            if (topics.value[i].category_id === categorys.value[j].category_id) {
                topics.value[i].category_name = categorys.value[j].category_name;
            }
        }
    }
    for (let i = 0; i < topics.value.length; i++) {
        for (let j = 0; j < expert_users.value.length; j++) {
            if (topics.value[i].assigned_to === expert_users.value[j].user_id) {
                topics.value[i].expert_name = expert_users.value[j].nickname;
            }
        }
    }

}
articleList();

//抽屉组件数据模型
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const topicsModel = ref({
    title: '',
    description: '',
    status: '',
    created_by: '',
    assigned_to: '',
    category_id: '',
    docs: '',
    batch_id: '',
    comments: '',
})
const reviewModel = ref({
    approved: '',
    topic_id: '',
    comments: '',
})


//添加表单校验
const rules = {
    status: [
    { validator: (rule, value, callback) => {
        if (value === 'approved' || value === 'rejected') {
          callback();
        } else {
          callback(new Error('审核结果的值必须是 "通过" 或 "未通过"'));
        }
      }, trigger: 'change' }
  ]
}

//添加文章
import { ElMessage } from 'element-plus';
const addReview = async () => {
    reviewModel.value.topic_id=topicsModel.value.topic_id;
    reviewModel.value.comments=topicsModel.value.comments;
    if(topicsModel.value.status==='approved'){
        reviewModel.value.approved=true;
    }
    else{
        reviewModel.value.approved=false;
    }
    //调用api
    let result = await reviewServiceAdd(reviewModel.value);
    ElMessage.success(result.message ? result.message : '添加成功');
    //让抽屉消失
    visibleDrawer.value = false;
    //刷新当前列表
    articleList();
}

//showDrawer,copy data from row to the drawer
//change the drawer's title, and its function varyies based on its title.
const drawertitle = ref('');
const showDrawer = (row) => {
    drawertitle.value = '审批申请';
    topicsModel.value.title=row.title
    topicsModel.value.description = row.description;
    topicsModel.value.status = row.status;
    topicsModel.value.created_by=row.created_by;
    topicsModel.value.expert_id=row.assigned_to;
    topicsModel.value.category_id= row.category_id;
    topicsModel.value.docs = row.docs;
    topicsModel.value.batch_id=row.batch_id;

    //extend topicsModel's attributes
    topicsModel.value.topic_id = row.topic_id;

    visibleDrawer.value = true;


}
//clear drawer's data
const clearDrawer = () => {
    topicsModel.value.title = '';
    topicsModel.value.description = '\n';
    topicsModel.value.status = '';
    topicsModel.value.created_by = '';
    topicsModel.value.category_id = '';
    topicsModel.value.docs = '';
    topicsModel.value.assigned_to= '';
    topicsModel.value.batch_id= '';
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
const clearSearch = () => {

    category_id.value = '';
    status.value = 'pending';
    assigned_to.value = currentUserId.value;
    created_by.value = '';
    batch_id.value = '';
    titleKey.value = '';
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">
                <span>文章审核</span>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="课题标题" >
                <el-input v-model="titleKey" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="文章分类：">
                <el-select placeholder="请选择" v-model="category_id" style="width:200px" filterable>
                    <el-option v-for="c in categorys" :key="c.category_id" :label="c.category_name"
                        :value="c.category_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="status" style="width:200px" disabled>
                    <el-option label="审核中" value="pending"></el-option>
                    <el-option label="通过" value="approved"></el-option>
                    <el-option label="未通过" value="rejected"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="批次编号">
                <el-select placeholder="请选择批次编号" v-model="batch_id" style="width:200px" filterable>
                        <el-option v-for="c in batchs" :key="c.active_batch_id" :label="c.active_batch_id" :value="c.active_batch_id">
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="用户编号" v-if="isAdmin">
                <el-input v-model="created_by" placeholder="请输入用户编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="articleList()">搜索</el-button>
                <el-button @click="clearSearch(); articleList()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="topics" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column show-overflow-tooltip label="文章标题" width="auto" prop="title"></el-table-column>
            <el-table-column show-overflow-tooltip label="创建用户的编号" width="auto" prop="created_by"></el-table-column>
            <el-table-column show-overflow-tooltip label="分类" width="auto" prop="category_id"
                v-if="false"></el-table-column>
            <el-table-column show-overflow-tooltip label="分类" width="auto" prop="category_name"></el-table-column>
            <el-table-column show-overflow-tooltip label="课题描述" width="auto" prop="description"></el-table-column>
            <el-table-column show-overflow-tooltip label="状态" width="auto" prop="status"
                :formatter="statusFormatter"></el-table-column>
            <el-table-column show-overflow-tooltip label="分配的专家" width="auto" prop="expert_name"></el-table-column>
            <el-table-column show-overflow-tooltip label="分配的专家" width="auto" prop="assigned_to"
                v-if="false"></el-table-column>
            <el-table-column show-overflow-tooltip label="批次编号" width="auto" prop="batch_id"></el-table-column>
            <el-table-column label="申请文件" width="auto" prop="docs">
                <template #default="{ row }">
                    <a :href="row.docs" target="_blank">
                        <el-button width="auto" type="primary">下载文档</el-button>
                    </a>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="发表时间" width="auto" prop="created_at"> </el-table-column>
            <el-table-column show-overflow-tooltip label="更新时间" width="auto" prop="updated_at"> </el-table-column>
            <el-table-column label="操作" width="auto">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDrawer(row)"></el-button>
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
            <el-form :model="topicsModel" label-width="100px" :rules="rules">
                <el-form-item label="课题标题" >
                    <el-input v-model="topicsModel.title" placeholder="请输入标题" disabled></el-input>
                </el-form-item>
                <el-form-item label="课题分类" >
                    <el-select placeholder="请选择" v-model="topicsModel.category_id" filterable disabled>
                        <el-option v-for="c in categorys" :key="c.category_id" :label="c.category_name"
                            :value="c.category_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核专家">
                    <el-input v-model=" userInfoStore.info.username" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="批次编号">
                    <el-select placeholder="请选择批次编号" v-model="topicsModel.batch_id" filterable disabled>
                        <el-option v-for="c in batchs" :key="c.active_batch_id" :label="c.active_batch_id" :value="c.active_batch_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批结果" prop="status">
                    <el-select placeholder="请选择" v-model="topicsModel.status">
                        <el-option label="审核中" value="pending"></el-option>
                        <el-option label="通过" value="approved"></el-option>
                        <el-option label="未通过" value="rejected"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="通过原因">
                    <!-- 富文本编辑器 -->
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="topicsModel.comments" contentType="html">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" 
                        @click="addReview() ">提交审批</el-button>
                    <el-button type="info" @click="visibleDrawer = false; clearDrawer();">取消</el-button>
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