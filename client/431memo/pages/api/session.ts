import axios from "axios"

export const useSession = async (cookie:string) => {
    const cok = cookie ? cookie : ''
    const session = await axios({
        url : `/auth`,
        headers : {
            Cookie : cok
        }
    });
    let name = '';
    if(session.data){
        const user = await axios({
            url : `/user`,
            headers : {
                Cookie : cok
            }
        });
        name = user.data;
    }
    return {
        session : session.data,
        name : name
    }
}