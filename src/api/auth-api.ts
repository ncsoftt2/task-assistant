import {instance} from "./api";
import {LoginPayloadType, ReturnResponseType} from "./api-types";

export const authAPI = {
    login(payload: LoginPayloadType){
        return instance.post<ReturnResponseType<{userId?: number}>>(`/auth/login`, payload)
    },
    logout(){
      return instance.delete<ReturnResponseType>(`/auth/login`)
    },
    me() {
        return instance.get<ReturnResponseType<{id:number,email:string,login:string}>>(`/auth/me`)
    }
}