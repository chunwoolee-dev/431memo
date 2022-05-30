import axios from "axios"

interface Props {
    context : string
    title ?: string
    id ?: number
}

export const memo = function({
    title,
    context,
    id
}:Props){
    const isEdit = id !== 0 ? true : false;
    const method = isEdit ? 'patch' : 'post';
    const dtm = new Date();
    const exTitle = title ? title : `${dtm.getFullYear()}-${dtm.getMonth()+1}-${dtm.getDate()} ${dtm.getHours()}:${dtm.getMinutes()}:${dtm.getSeconds()}`;
    const data = {
        title : exTitle,
        context : context,
        id : id
    }

    return axios({
        url:'/memo',
        method:method,
        data:data
    });
}