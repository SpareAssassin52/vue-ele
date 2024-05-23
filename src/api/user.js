//导入request.js请求工具
import request from '@/utils/request.js'

//提供调用注册接口的函数
export const userRegisterService = (registerData) => {
    //借助UrlSearchParams完成传递参数
    const params = new URLSearchParams();    //把Json格式的参数拆成queryString格式。
    for (let key in registerData) {
        params.append(key, registerData[key]);
    }
    //console.log(params.toString());
    return request.post('/user/register', params);
}

//提供调用登录接口的函数
export const userLoginService = (loginData) => {

    // console.log(loginData);

    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    return request.post('/user/login', params);
}

//获取用户详细信息
export const userInfoService = () => {
    return request.get('/user/userInfo');
}

//更新用户头像
export const userAvatarUpdateService=(avatarUrl)=>{
    const params=new URLSearchParams();
    params.append('avatar_url', avatarUrl);
    return request.patch('/user/updateAvatar', params);
}

//更新用户信息
export const userInfoUpdateService=(userData)=>{
    return request.put('/user/update', userData);
}

//更新用户密码
export const userUpdatePasswordService=(passwords)=>{
    return request.patch('/user/updatePwd', passwords)
}

//根据用户id查询用户信息
export const userFindByIdService=(user_id)=>{
    return request.get('/user/findById?user_id='+user_id);
}

//根据用户身份查询用户信息
export const userFindByRoleService=(role)=>{
    return request.get('/user/findByRole?role='+role);
}

//查询所有用户信息
export const userListAllService=(params)=>{
    return request.get('/user/all', {params: params});
}