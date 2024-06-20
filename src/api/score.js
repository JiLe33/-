import request from '@/util/request'

export const getSlist=()=>{
    return request.get('/listA')
}
export const getBlist=()=>{
    return request.get('/listB')
}

export const toadd=(registerdata)=>{
    return request.put('/addA',registerdata)
}

export const todelete=(registerdata)=>{
    return request.delete(`/delA/${registerdata}`)
}

export const loginout=()=>{
    return request.delete('/loginoutA')
}