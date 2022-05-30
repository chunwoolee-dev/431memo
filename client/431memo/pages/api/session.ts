import { SessionContext } from "@components/Session";
import axios from "axios"
import { NextRouter } from "next/router";
import { useContext } from "react";

export const getSession = async (cookie:string) => {
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
        user : name,
        err : err
    }
}

export const logout = async (router:NextRouter, setSession:Function) => {
    axios({
        url:'/logout',
        method:'post'
    })
    .then(data => {
        router.push('/')
        getSession(document.cookie).then((data) => {
            setSession({...data});
        })
    })
    .catch(data => alert('실패'))
}

export const useSession = () => {
    const data = useContext(SessionContext);
    return data;
}

function isBoolean(data:any){
    if(data === false || data === true){
        return true;
    }else{
        return false;
    }
}