import request from '@/util/request'



export const tologin=(logindata)=>{
    return request.post('/login',logindata)
}

export const toregister=(registerdata)=>{
    return request.put('/register',registerdata)
}

