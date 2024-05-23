<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';
import {aaServiceadd} from '@/api/AdminAction.js';

//获取用户id
import useUserInfoStore from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore();   //创建pinia对象
const currentUserId=ref(''); //存储用户的id
const isAdmin=ref(true);//是否为管理员
import { useRouter } from 'vue-router';
const router = useRouter();
const getUserInfo =  () => {     //从token中获取当前用户的所有信息等信息
    //console.log(userInfoStore.info.role!=="admin");
    currentUserId.value=userInfoStore.info.user_id;
    if(userInfoStore.info.role!=="admin"){
        isAdmin.value=false;
        ElMessage.error("非管理员用户");
        router.push('/');
    }
    //console.log(isAdmin.value);
}
getUserInfo();

const aaModel=reactive({
    admin_id: currentUserId,
    action_type: "",
    description: ""
})

//管理员搜索时的用户id
const userId = ref('');
//搜索的用户身份
const role = ref('');
//搜索的用户名关键字
const userNameKey=ref('');

//文章列表数据模型
const users = ref([
  {
    "user_id": 2,
    "username": "admin1245",
    "nickname": "",
    "email": "",
    "avatar_url": null,
    "role": "admin",
    "created_at": "2024-04-09 16:33:27",
    "updated_at": "2024-04-11 17:06:21"
  },
  {
    "user_id": 2,
    "username": "admin1245",
    "nickname": "",
    "email": "",
    "avatar_url": null,
    "role": "admin",
    "created_at": "2024-04-09 16:33:27",
    "updated_at": "2024-04-11 17:06:21"
  },
  {
    "user_id": 2,
    "username": "admin1245",
    "nickname": "",
    "email": "",
    "avatar_url": null,
    "role": "admin",
    "created_at": "2024-04-09 16:33:27",
    "updated_at": "2024-04-11 17:06:21"
  },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    userListAll();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    userListAll();
}

import {userListAllService, userInfoUpdateService} from '@/api/user.js';


//获取文章列表数据
const userListAll = async () => {
    //先组装参数
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        user_id: userId.value ? userId.value : null,
        role: role.value ? role.value : null,
        userNameKey: userNameKey.value? userNameKey.value :null,
    }
    let result = await userListAllService(params);
    //得到结果后渲染视图
    total.value = result.data.total;
    users.value = result.data.items;

}
userListAll();

//抽屉组件数据模型
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const userModel = ref({
    user_id: '',
    username: '',
    nickname: '',
    email: '',
    avatar_url: '',
    role: '',
})

// 导入token
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore();
//上传成功的回调函数
const uploadSuccess = (result) => {
    userModel.value.avatar_url = result.data;
    //console.log(result.data);
}


//showDrawer,copy data from row to the drawer
//change the drawer's title, and its function varyies based on its title.
const drawertitle = ref('');
const showDrawer = (row) => {
    drawertitle.value = '编辑用户信息';
    userModel.value.user_id = row.user_id;
    userModel.value.username= row.username;
    userModel.value.nickname= row.nickname;
    userModel.value.email= row.email;
    userModel.value.avatar_url= row.avatar_url;
    userModel.value.role=row.role;

    visibleDrawer.value = true;

}
//clear drawer's data
const clearDrawer = () => {
    userModel.value.user_id= '',
    userModel.value.username= '',
    userModel.value.nickname= '',
    userModel.value.email= '',
    userModel.value.avatar_url= '',
    userModel.value.role= ''

}
//update Article
const updateuser = async () => {
    let result = await userInfoUpdateService(userModel.value);
    ElMessage.success(result.data ? result.data : '更新成功');
    aaModel.action_type="更新用户数据";
    aaModel.description="用户编号："+userModel.value.user_id+"的数据被管理员修改";
    let resultaa=await aaServiceadd(aaModel);
    //disappear drawer
    visibleDrawer.value = false;
    //refresh article list
    userListAll();
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header" style="font-size: 16pt">
                <span>用户管理</span>
                <!-- <div class="extra">
                    <el-button type="primary"
                        @click="visibleDrawer = true; drawertitle = '添加文章'; clearDrawer();">添加文章</el-button>
                </div> -->
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="用户编号">
              <el-input v-model="userId" placeholder="请输入用户编号"></el-input>
            </el-form-item>
            <el-form-item label="用户身份">
                <el-select placeholder="请选择" v-model="role" style="width:200px">
                    <el-option label="用户" value="user"></el-option>
                    <el-option label="专家" value="expert"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名关键字">
                <el-input v-model="userNameKey" placeholder="请输入用户编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="userListAll()">搜索</el-button>
                <el-button @click="userId = ''; role = ''; userListAll()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="users" style="width: 100%">
            <el-table-column label="序号" width="auto" type="index"> </el-table-column>
            <el-table-column show-overflow-tooltip label="用户编号" width="auto" prop="user_id"></el-table-column>
            <el-table-column show-overflow-tooltip label="用户名" width="auto" prop="username"></el-table-column>
            <el-table-column show-overflow-tooltip label="用户昵称" width="auto" prop="nickname"> </el-table-column>
            <el-table-column show-overflow-tooltip label="用户身份" width="auto" prop="role"></el-table-column>
            <el-table-column show-overflow-tooltip label="用户邮箱" width="auto" prop="email"></el-table-column>
            <el-table-column label="用户头像" width="auto" prop="avatar_url">
              <template #default="{ row }">
                <img v-if="row.avatar_url" :src="row.avatar_url" class="avatar" />
              </template>
            </el-table-column>
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
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" :title="drawertitle" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="userModel" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="userModel.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                  <el-input v-model="userModel.nickname" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户身份">
                  <el-select placeholder="请选择" v-model="userModel.role" style="width:200px">
                    <el-option label="用户" value="user"></el-option>
                    <el-option label="专家" value="expert"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户邮箱">
                <el-input v-model="userModel.email" placeholder="请输入用户邮箱"></el-input>
              </el-form-item>
                <el-form-item label="用户头像">
                    <!-- 
                        atuo-upload:设置是否自动上传
                        action:设置服务器接口路径;存在跨域问题，需要加上'/api'
                        name:设置上传的文件字段名
                        :headers:设置上传的请求头;从pinia中获取，需要先导入再获取
                        :on-success:设置上传成功的回调函数
                     -->
                    <el-upload class="avatar-uploader" :auto-upload="true" :limit="1" :show-file-list="true" action="/api/upload"
                        name="file" :headers="{ 'Authorization': tokenStore.token }" :on-success="uploadSuccess">
                        <img v-if="userModel.avatar_url" :src="userModel.avatar_url" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click="updateuser()">更新</el-button>
                    <el-button type="info"
                        @click="visibleDrawer = false; clearDrawer();">取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>

</template>
<style lang="scss" scoped>
.avatar {
  width: 50px; /* 调整为你需要的宽度 */
  height: 50px; /* 调整为你需要的高度 */
  object-fit: cover; /* 保持图片的比例 */
}

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