import request from '@/util/request'

export const getlist=()=>{
    return request.get('/list')
}

export const getlistscore=()=>{
    return request.get('/listscore')
}

export const toadd=(registerdata)=>{
    return request.put('/add',registerdata)
}

export const todelete=(registerdata)=>{
    return request.delete(`/del/${registerdata}`)
}

export const loginout=()=>{
    return request.delete('/loginout')
}