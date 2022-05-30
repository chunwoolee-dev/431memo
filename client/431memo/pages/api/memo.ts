import axios from "axios"

interface Props {
    context : string
    title ?: string
    id ?: number
    mtd ?: string
}

export const memo = function({
    title,
    context,
    id,
    mtd
}:Props){
    const isEdit = id !== 0 ? true : false;
    const method = mtd ? mtd : isEdit ? 'patch' : 'post';
    const dtm = new Date();
    const exTitle = title ? title : `${dtm.getFullYear()}-${dtm.getMonth()+1}-${dtm.getDate()} ${dtm.getHours()}:${dtm.getMinutes()}:${dtm.getSeconds()}`;
    const data = {
        title : exTitle,
        context : context,
        id : id
    }

    const opt:any = {
        url : '/memo',
        method : method
    }

    if(mtd === 'delete'){
        opt.params = data;
    }else{
        opt.data = data;
    }

    return axios(opt);
}