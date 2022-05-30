import { memo } from "@pages/api/memo";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import ContextMenu from "./ContextMenu";
import Loading from "./Loading";
import RadiusButton from "./RadiusButton";

const MemoListWrap = styled.div`
    position:relative;
    flex:1;
    overflow-y:auto;
`
const LoadingWrap = styled.div`
    position:absolute;
    top:50%; left:50%;
    transform:translate(-50%, -50%);
    width:48px;
    height:48px;
`

const Empty = styled.div`
    position:absolute;
    top:50%; left:50%;
    transform:translate(-50%, -50%);
    user-select:none;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:${props => props.theme.space.b};
`

const MemoListUl = styled.ul`
    display:grid;
    gap:${props => props.theme.space.b};
    padding:${props => props.theme.space.b};
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`
const MemoItem = styled.li`
    cursor:pointer;
    border-radius:${props => props.theme.space.b};
    border:${props => props.theme.border};
    background:${props => props.theme.backgroundColor};
    width:100%;
    position:relative;
    overflow:hidden;
    user-select:none;

    &:before {
        content:''; display:block; padding-bottom:100%;
    }
`

const MemoDetail = styled.div`
    position:absolute;
    top:0; left:0; right:0; bottom:0;

    > .context {
        font-size:12px;
        opacity:0.5;
    }
    > .title {
        position:absolute;
        bottom:0;
        width:100%;
        padding:${props => props.theme.space.b};
        background:${props => props.theme.paper}99;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        backdrop-filter:blur(4px);
    }
`

const AddBtn = styled.div`
    position:fixed;
    bottom:24px;
    right:32px;
    .wrapper {
        display:flex;
        align-items:center;
        justify-content:center;
        width:24px;
        height:calc(24px + ${props => props.theme.space.b});
    }
`

interface Memo {
    context : string
    title : string
    id : number
}

const MemoList = function() {
    const theme = useTheme();
    const [memoList, setList]:[Array<Object>|undefined, Function] = useState();
    const [context, setContext] = useState({
        isShow : false,
        x : 0,
        y : 0,
        id : 0
    });
    const [memos, setMemo] = useState([]);
    const getMemo = () => {
        axios({
            url:'/memo/list',
            params:{
                count:100,
                page:1
            }
        }).then(({data}) => {
            const list = data ? data : []
            setList(list);
            setMemo(list.map((item:Memo) => {
                return (
                    <MemoItem className="menu-item" key={item.id} data-id={item.id}>
                        <Link href={`/memo/${item.id}`}>
                            <MemoDetail>
                                <pre className="context">{item.context}</pre>
                                <div className="title">{item.title}</div>
                            </MemoDetail>
                        </Link>
                    </MemoItem>
                )
            }));
        });
    }
    useEffect(getMemo, []);

    return (
        <MemoListWrap onContextMenu={(e) => {
            e.preventDefault();
            const item = (e.target as HTMLElement).classList.contains('menu-item') ? e.target as HTMLElement : (e.target as HTMLElement).closest('.menu-item');
            if(item){
                setContext({
                    isShow : true,
                    x : e.clientX,
                    y : e.clientY,
                    id : Number(item.getAttribute('data-id'))
                });
            }else{
                setContext({
                    isShow : false,
                    x : 0,
                    y : 0,
                    id : 0
                })
            }
            return false;
        }} onClick={(e) => {
            setContext({
                isShow : false,
                x : 0,
                y : 0,
                id : 0
            })
        }}>
            {
                memoList === undefined
                ?
                    <LoadingWrap>
                        <Loading/>
                    </LoadingWrap>
                :
                    memoList.length === 0
                ?
                    <Empty>
                        <p>메모가 없습니다</p>
                        <div>
                            <Link href="/memo/add">
                                <RadiusButton>
                                    <p className="title">메모 추가</p>
                                    <p className="material-symbols-outlined icon-16">add</p>
                                </RadiusButton>
                            </Link>
                        </div>
                    </Empty>
                :
                <>
                    <MemoListUl>
                        {memos}
                    </MemoListUl>
                    {
                        context.isShow
                        ?
                        <ContextMenu x={context.x} y={context.y} id={context.id} onClick={() => {
                            memo({
                                title:'',
                                context:'',
                                id:context.id,
                                mtd:'delete'
                            })
                            setContext({
                                isShow : false,
                                x : 0,
                                y : 0,
                                id : 0
                            })
                        }}/>
                        :
                        null
                    }
                    <Link href="/memo/add">
                        <AddBtn>
                            <RadiusButton backgroundColor={theme.name === 'dark' ? theme.colors.secondary[4] : theme.colors.primary[4]}
                                          color={theme.backgroundColor}>
                                <div className="wrapper">
                                    {/* <p className="title">메모 추가</p> */}
                                    <p className="material-symbols-outlined icon-48">add</p>
                                </div>
                            </RadiusButton>
                        </AddBtn>
                    </Link>
                </>
            }            
        </MemoListWrap>

    )
}

export default MemoList;