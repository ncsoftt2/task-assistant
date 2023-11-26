import {BaseResponseType} from "common/types";
import {instance} from "common/api";
import { LoginPayloadType } from "./authApi.types";

export const authAPI = {
    login(payload: LoginPayloadType){
        return instance.post<BaseResponseType<{userId?: number}>>(`/auth/login`, payload)
    },
    logout(){
        return instance.delete<BaseResponseType>(`/auth/login`)
    },
    me() {
        return instance.get<BaseResponseType<{id:number,email:string,login:string}>>(`/auth/me`)
    }
}