import { Button, ButtonPosition, ButtonWrap } from "@components/BottomButtom";
import Header from "@components/Header";
import Wrapper from "@components/Wrapper";
import { memo } from "@pages/api/memo";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Page = styled.div`
    display:flex;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    flex-direction:column;
`
const InputWrap = styled.div`
    flex:1;
    overflow-y:auto;
    position:relative;
`

const TitleWrap = styled.label`
    position:sticky;
    cursor:text;
    display:block;
    background:${props => props.theme.backgroundColor};
    top:${props => props.theme.space.b};
    padding:${props => props.theme.space.b};
    margin-bottom:${props => props.theme.space.b};
    border:${props => props.theme.border};
    border-radius:${props => props.theme.space.m};

    input {
        all:unset;
    }
`

const TextArea = styled.label`
    display:block;
    cursor:text;
    height:100%;
    padding:128px 0;
    flex:1;

    textarea {
        all:unset;
        resize:none;
        width:100%;
        height:100%;
        
        &:before {
            content:attr(placeholder);
        }
    }
`

interface Props {
    data : {
        context : string
        title : string
        id : number
        authorId : number
        createdAt : string
        updatedAt : string
    } | null
}

interface MutableRefObject<T> {
    current: T;
}

const Memo:NextPage<Props> = ({data}) => {
    const router = useRouter();
    const [title, setTitle] = useState(data ? data.title : '');
    const [context, setContext] = useState(data ? data.context : '');

    const id = data === null ? 0 : Number(router.query.id);
    const [timer, setTimer] = useState(setTimeout(()=>{}));
    const TEXTAREA = useRef(null);
    useEffect(() => {
        const tx:any = TEXTAREA.current;
        tx.style.height = 'auto';
        tx.style.height = `${tx.scrollHeight}px`;
    }, []);
    useEffect(() => {
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            if(title !== '' || context !== ''){
                saveMemo({
                    title:title,
                    context:context,
                    id:id
                }, router);
            }
        }, 300));
    }, [title, context]);

    return (
        <Page>
            <Header/>
            <InputWrap>
                <Wrapper>
                    <TitleWrap>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="??????"/>
                    </TitleWrap>
                    <TextArea>
                        <textarea value={context} autoFocus={true} onChange={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                            setContext(e.target.value);
                        }} placeholder="??????" ref={TEXTAREA}></textarea>
                    </TextArea>
                    <ButtonPosition>
                        <ButtonWrap>
                            {
                                id !== 0
                                ?
                                <Button onClick={() => {
                                    memo({
                                        title:title,
                                        context:context,
                                        id:id,
                                        mtd:'delete'
                                    }).then(data => router.back());
                                }}>
                                    <p className="material-symbols-outlined red">delete</p>
                                </Button>
                                :
                                null
                            }
                            <Button onClick={() => {
                                saveMemo({
                                    title:title,
                                    context:context,
                                    id:id
                                }, router).then(data => router.back());
                            }}>
                                <p className="material-symbols-outlined">done</p>
                            </Button>
                        </ButtonWrap>
                    </ButtonPosition>
                </Wrapper>
            </InputWrap>
        </Page>
    )
}

function saveMemo({
    title,
    context,
    id
}:{
    title:string
    context:string
    id:number
}, router:NextRouter){
    return memo({
        title:title,
        context:context,
        id:id
    }).then(data => {
        if(router.asPath === '/memo/add'){
            router.replace(`/memo/${data.data}`)
        }
    });
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