import axios from "axios"
import { NextRouter } from "next/router";

export const useSession = async (cookie:string) => {
    const cok = cookie ? cookie : '';
    const session = await axios({
        url : `/auth`,
        headers : {
            Cookie : cok
        }
    })
    .then(data => data)
    .catch(data => data);
    const data = isBoolean(session.data) ? session.data : null;
    
    let name = null;
    if(data){
        const user = await axios({
            url : `/user`,
            headers : {
                Cookie : cok
            }
        });
        name = user.data;
    }

    const err = data === null ? {
        isFailed : true,
        msg : session.code
    } : {
        isFaild : false,
        msg : ''
    }

    return {
        session : data,
        name : name,
        err : err
    }
}

export const logout = async (router:NextRouter) => {
    axios({
        url:'/logout',
        method:'post'
    })
    .then(data => router.push('/'))
    .catch(data => alert('실패'))
}

function isBoolean(data:any){
    if(data === false || data === true){
        return true;
    }else{
        return false;
    }
}