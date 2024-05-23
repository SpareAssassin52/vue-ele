//导入request.js请求工具
import request from '@/utils/request.js';
import {format} from 'date-fns';

export const batchServiceList = (params) => {
    return request.get('/activeBatch', { params: params });  //自动把对象类型的参数分解成为 queryString 类型的请求格式
}

//批次添加
export const batchServiceAdd = (batchModel) => {
    batchModel.start_time=format(batchModel.start_time, 'yyyy-MM-dd HH:mm:ss');
    batchModel.end_time=format(batchModel.end_time, 'yyyy-MM-dd HH:mm:ss');
    return request.post('/activeBatch', batchModel);
}

//批次修改
export const batchServiceUpdate = (batchModel) => {
    batchModel.start_time=format(batchModel.start_time, 'yyyy-MM-dd HH:mm:ss');
    batchModel.end_time=format(batchModel.end_time, 'yyyy-MM-dd HH:mm:ss');
    return request.put('/activeBatch', batchModel);
}

//批次删除
export const batchServiceDelete = (params) => {
    return request.delete('/activeBatch', { params: params });
}

//获得当前开放的或者未来开放的批次
export const batchServiceListNowThen=()=>{
    return request.get('/activeBatch/nowThen');
}

export const batchServiceListAll=()=>{
    return request.get('/activeBatch/all');
}

export const batchServiceListNow=()=>{
    return request.get('/activeBatch/now');
}