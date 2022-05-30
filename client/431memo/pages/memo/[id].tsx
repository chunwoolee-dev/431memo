import Header from "@components/Header";
import RadiusButton from "@components/RadiusButton";
import { memo } from "@pages/api/memo";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
    data : {
        context : string
        title : string
    } | null
}

const Memo:NextPage<Props> = ({data}) => {
    const router = useRouter();
    const [title, setTitle] = useState(data ? data.context : '');
    const [context, setContext] = useState(data ? data.context : '');

    const id = data === null ? 0 : Number(router.query.id);

    return (
        <>
            <Header/>
            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea value={context} onChange={(e) => setContext(e.target.value)}></textarea>

            <RadiusButton onClick={() => {
                memo({
                    title:title,
                    context:context,
                    id:id
                }).then(data => router.push('/'));
            }}>저장</RadiusButton>
        </>
    )
}

export async function getServerSideProps(context:NextPageContext){
    const id = context.query.id === 'add' ? '' : context.query.id;
    const isEdit = id === '' ? false : true;
    const cok = context.req?.headers.cookie ? context.req.headers.cookie : '';

    if(cok === ''){
        return {
            redirect : {
                destination: '/',
                permanent: false,
            }
        }
    }

    const data = isEdit ? await axios({
        url:'/memo',
        params:{
            id:id
        },
        headers : {
            cookie : cok
        }
    }) : {data:null};
    const memo = data.data;
    if(Array.isArray(memo)){
        return {
            redirect : {
                destination: '/memo/add',
                permanent: false,
            }
        }
    }else{
        return {
            props : {
                data : memo,
            }
        }
    }
}

export default Memo;