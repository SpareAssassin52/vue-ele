<script setup>
import {
    Download
} from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { nextTick, ref } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';      //用于生成PDF


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
    if(userInfoStore.info.role!=="admin"){
        isAdmin.value=false;
        if(router.currentRoute.value.path==='/topics/all'){
            ElMessage.error('非管理员用户');
            router.push('/topics');
        }
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
const status = ref('');
//用户搜索时显示的专家id
const assigned_to=ref('');
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
import {batchServiceListAll} from '@/api/batch.js';
const BatchListNowThen=async()=>{
    let result= await batchServiceListAll();
    batchs.value=result.data; 
}
BatchListNowThen();
//获取分类数据模型
import { categoryServiceListAll ,categoryServiceList, topicServiceList, reviewServiceFindByTopic } from '@/api/topic.js'   //导入查询分类函数
const CategoryList = async () => {
    if(isAdmin.value){
        let result =await categoryServiceListAll();
        categorys.value=result.data;
    }
    else{
        let result = await categoryServiceList();
        categorys.value = result.data;
    }
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
        category_id: category_id.value ? category_id.value : null,
        status: status.value ? status.value : null,
        assigned_to: assigned_to.value? assigned_to.value: null,
        created_by: isAdmin.value? created_by.value? created_by.value: null : currentUserId.value,
        batch_id: batch_id.value? batch_id.value: null, 
        titleKey: titleKey.value?titleKey.value: null,
    }
    let result = await topicServiceList(params);
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

//弹窗开关
const showDialog=ref(false);
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
//添加表单数据模型
const PDFModel = ref({
    topic_id: '',
    title: '',
    category_name: '',
    //description: '',
    status: '',
    created_by: '',
    assigned_to: '',
    expert_name: '',
    //docs: '',
    batch_id: '',
    review_id: '',
    comments: '',
})
import { ElMessage } from 'element-plus';

import {} from '@/api/topic.js';
const generatePDF = async () => {   //打印成pdf
    const element = document.getElementById('pdf-content');
    const canvas = await html2canvas(element);
    console.log(canvas);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(data, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('download.pdf');
}
const printPDF = async(row) => {     //填写数据模型的数据
    let result=await reviewServiceFindByTopic(row.topic_id);
    console.log(result.data[0]);
    PDFModel.value.title=row.title
    //PDFModel.value.description = row.description;

    // PDFModel.value.status = row.status;
    if(row.status==='approved'){PDFModel.value.status='通过';}
    else if(row.status==='rejected'){PDFModel.value.status='不通过';}

    // PDFModel.value.created_by=row.created_by;
    PDFModel.value.created_by=userInfoStore.info.username;  //填入用户名
    PDFModel.value.assigned_to=row.assigned_to;
    PDFModel.value.expert_name=row.expert_name;
    PDFModel.value.category_name= row.category_name;
    //PDFModel.value.docs = row.docs;
    PDFModel.value.batch_id=row.batch_id;
    PDFModel.value.topic_id = row.topic_id;
    PDFModel.value.review_id= result.data[0].review_id;
    PDFModel.value.comments=result.data[0].comments;

    showDialog.value=true;

    nextTick(()=>{
        generatePDF();
    })
}
//clear drawer's data
const clearPDF = () => {
    PDFModel.value.title = '';
    PDFModel.value.description = '\n';
    PDFModel.value.status = '';
    PDFModel.value.created_by = '';
    PDFModel.value.category_id = '';
    PDFModel.value.docs = '';
    PDFModel.value.assigned_to= '';
    PDFModel.value.batch_id= '';
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
    status.value = '';
    assigned_to.value = '';
    created_by.value = '';
    batch_id.value = '';
    titleKey.value = '';
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">
                <span>打印审核结果表单</span>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="课题标题">
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
                <el-select placeholder="请选择" v-model="status" style="width:200px">
                    <el-option label="审核中" value="pending"></el-option>
                    <el-option label="通过" value="approved"></el-option>
                    <el-option label="未通过" value="rejected"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专家编号">
                <el-select placeholder="请选择" v-model="assigned_to" style="width:200px" filterable>
                    <el-option v-for="c in expert_users" :key="c.user_id" :label="c.nickname" :value="c.user_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="批次编号">
                <el-select placeholder="请选择批次编号" v-model="batch_id" style="width:200px" filterable>
                    <el-option v-for="c in batchs" :key="c.active_batch_id" :label="c.active_batch_id"
                        :value="c.active_batch_id">
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
            <el-table-column show-overflow-tooltip label="创建人id" width="auto" prop="created_by"
                v-if="false"></el-table-column>
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
            <el-table-column label="打印结果" width="auto">
                <template #default="{ row }">
                    <el-button :icon="Download" circle plain type="primary" @click="printPDF(row)"
                        :disabled="row.status==='pending'"></el-button>
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
        <el-dialog v-model="showDialog" title="打印结果" width="auto">
             <div id="pdf-content">
                <!-- 你的数据模型内容，按照需要排版 -->
                <p>课题编号：{{ PDFModel.topic_id }}</p>
                <p>课题题目：{{ PDFModel.title }}</p>
                <p>课题分类：{{ PDFModel.category_name}}</p>
                <p>课题状态：<strong>{{ PDFModel.status}}</strong></p>
                <p>课题创建人：{{ PDFModel.created_by}}</p>
                <p>审核专家编号：{{ PDFModel.assigned_to}}</p>
                <p>审核专家名：{{ PDFModel.expert_name}}</p>
                <p>审核批次编号：{{ PDFModel.batch_id}}</p>
                <p>专家审核表编号：{{ PDFModel.review_id}}</p>
                <p>专家评语：{{ PDFModel.comments}}</p>
            </div>
        </el-dialog>
    </el-card>
    <!-- <el-card>
       
    </el-card> -->

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