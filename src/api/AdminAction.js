//导入request.js请求工具
import request from '@/utils/request.js';

export const aaServiceadd=(adminActionModel)=>{
    return request.post('/adminActions', adminActionModel);
}

export const aaServiceList=(params)=>{
    return request.get('/adminActions', {params: params});
}