//导入request.js请求工具
import request from '@/utils/request.js';

//分类查询
export const categoryServiceList=()=>{
    return request.get('/category');
}

//所有分类查询
export const categoryServiceListAll=()=>{
    return request.get('/category/all');
}
//分类添加
export const categoryServiceAdd=(categoryData)=>{
    return request.post('/category', categoryData);
}

//分类修改
export const categoryServiceUpdate = (categoryData) => {  //Json格式的参数
    return request.put('/category', categoryData);
}

//分类删除
export const categoryServiceDelete = (id) => {
    return request.delete('/category?category_id=' + id);
}

//课题申请表查询
export const topicServiceList=(params)=>{
    return request.get('/topic', {params: params});
}

//课题申请表添加
export const topicServiceAdd=(topicModel)=>{
    return request.post('/topic', topicModel);
}

//课题申请表修改
export const topicServiceUpdate=(topicModel)=>{
    return request.put('/topic', topicModel);
}

//课题申请表删除
export const topicServiceDelete=(topic_id)=>{
    return request.delete('/topic?topic_id='+topic_id);
}

//显示课题申请表的细节
export const topicServiceDetail=(topic_id)=>{
    return request.get('/topic/detail?topic_id='+ topic_id);
}

//添加课题的内容文档docs
export const topicServiceDocs=(topic_id, docs_url)=>{
    const params=new URLSearchParams();
    params.append('topic_id', topic_id);
    params.append('docs', docs_url);
    return request.patch('/topic/docs',{params: params} );
}

//为课题分配专家
export const topicServiceAddExpert=(topic_id, expert_id)=>{
    const params= new URLSearchParams();
    params.append('topic_id', topic_id);
    params.append('expert_id', expert_id);
    return request.put('/topic/addExpert', {params: params});
}

//为课题申请表添加批次
export const topicServiceAddBatch=(topic_id, batch_id)=>{
    const params= new URLSearchParams();
    params.append('topic_id', topic_id);
    params.append('batch_id_id', batch_id);
    return request.patch('/topic/addBatch', {params: params});
}

//寻找某一批次中有无申请表
export const topicServiceFindByBatch=(batch_id)=>{
    return request.get('/topic/findByBatch?batch_id='+ batch_id );
}

//查找所有审核中与没有分配专家与批次的记录
export const topicServiceAutoAB=()=>{
    return request.get('/topic/auto');
}

//查找当前开放批次中需要审核的课题
export const topicServiceReview=(params)=>{
    return request.get('/topic/review', {params: params})
}


//查询课题有无审核表
export const reviewServiceFindByTopic=(topic_id)=>{
    return request.get('/review/findByTopic?topic_id='+ topic_id );
}

//发布审核表
export const reviewServiceAdd=(reviewModel)=>{
    return request.post('/review', reviewModel);
}

//查询该专家目前所有审批的审核表
export const reviewServiceList=(params)=>{  //在接口外打包
    return request.get('/review', {params: params});
}

//查看审核表详细信息
export const reviewServiceFindByReview=(review_id)=>{
    return request.get('/review/findByReview?review_id='+ review_id);
}

//更新审核表信息
export const reviewServiceUpdate=(reviewModel)=>{
    return request.put('/review', reviewModel);
}

//删除审核表
export const reviewServiceDelete=(review_id)=>{
    return request.delete('review/delete?review_id='+ review_id);
}