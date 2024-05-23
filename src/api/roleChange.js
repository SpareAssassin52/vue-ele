//导入request.js请求工具
import request from '@/utils/request.js';

//添加身份请求
export const roleChangeServiceAdd=(roleRequestModel)=>{
    //console.log(roleRequestModel.value);
    return request.post('/roleChange', roleRequestModel);
}

//查看身份请求
export const roleChangeServiceList=(params)=>{
    return request.get('/roleChange', {params: params})
}

//修改身份请求
export const roleChangeServiceUpdate=(roleRequestModel)=>{
    return request.put('/roleChange/change', roleRequestModel);
}