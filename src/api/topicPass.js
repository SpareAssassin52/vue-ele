//导入request.js请求工具
import request from '@/utils/request.js';

//查找课题通过公告
export const topicPassServiceList=(params)=>{
    return request.get('/topicPass', {params: params});
}

//修改课题通过公告
export const topicPassServiceUpdate=(topicPassModel)=>{
    return request.put('/topicPass', topicPassModel);
}

//删除课题通过公告
export const topicPassServiceDelete=(pass_id)=>{
    return request.delete('/topicPass?pass_id='+ pass_id );
}


