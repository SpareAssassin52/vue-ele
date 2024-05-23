//导入request.js请求工具
import request from '@/utils/request.js';

//课题表总数
export const analysisServiceTotalTopics=()=>{
    return request.get('/analysis/totalTopics');
}
//课题表仍然在申请的个数
export const analysisServicePendingTopics=()=>{
    return request.get('/analysis/pendingTopics');
}
//课题表已经完成审核的个数
export const analysisServicePassedTopics=()=>{
    return request.get('/analysis/passedTopics');
}
//本月提交的申请表个数
export const analysisServiceThisMonthTopics=()=>{
    return request.get('/analysis/thisMonthTopics');
}
//用户创建的分类个数
export const analysisServiceTotalCategorys=()=>{
    return request.get('/analysis/totalCategorys');
}
