import { memo } from "@pages/api/memo";
import { Button, ButtonPosition, ButtonWrap } from "@components/BottomButtom";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import ContextMenu from "./ContextMenu";
import Loading from "./Loading";
import RadiusButton from "./RadiusButton";


const Selector = styled.div`
    width:32px; height:32px;
    border-radius:50%;
    border:${props => props.theme.border};
    border-width:2px;
    background:${props => props.theme.backgroundColor};
    position:absolute;
    top:${props => props.theme.space.m};
    right:${props => props.theme.space.m};
    justify-content:center;
    align-items:center;
    display:none;
    @media (pointer: coarse) {
        display:flex;
    }

    > .material-symbols-outlined {
        display:none;
        color:${props => props.theme.backgroundColor};
    }
`

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
const MemoWh = styled.div`
    height:100%;
    flex:1;
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
    transform:translate3d(0,0,0);
    border:${props => props.theme.border};
    background:${props => props.theme.backgroundColor};
    width:100%;
    position:relative;
    overflow:hidden;
    user-select:none;

    &:before {
        content:''; display:block; padding-bottom:100%;
    }

    &:hover > ${Selector} {
        display:flex;
    }
    &[data-selected="true"] > ${Selector} {
        display:flex;
        border:0;
        background:${props => props.theme.name === 'light' ? props.theme.colors.primary[4] : props.theme.colors.secondary[4]};

        > .material-symbols-outlined {
            display:block;
        }
    }
    &[data-selected="true"]:after {
        content:'';
        position:absolute;
        top:-1px; left:-1px; right:-1px; bottom:-1px;
        border:3px solid ${props => props.theme.name === 'light' ? props.theme.colors.primary[4] : props.theme.colors.secondary[4]};
        border-radius:${props => props.theme.space.b};
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
const AddBtnWrap = styled.div`
    padding:0 ${props => props.theme.space.b};
`

interface Memo {
    context : string
    title : string
    id : number
    selected : boolean
}

const MemoList = function() {
    const theme = useTheme();
    const [memoList, setList]:[Array<Memo>|undefined, Function] = useState();
    const [selectedMemo, setSelectedMemo]:[Array<Memo>, Function] = useState([]);
    const [memos, setMemo]:[Array<any>, Function] = useState([]);
    const [context, setContext] = useState({
        isShow : false,
        x : 0,
        y : 0,
        id : 0
    });

    const selectHandler = (e:any, list:Array<Memo>) => {
        const id = Number((e.target as HTMLElement).closest('[data-id]')?.getAttribute('data-id'));
        const idx = list.findIndex((item:Memo) => item.id === id);
        list[idx].selected = !list[idx].selected;
        setList(list);
        setSelectedMemo(list.filter((item:Memo) => item.selected));
    }

    const getMemo = () => {
        axios({
            url:'/memo/list',
            params:{
                count:100,
                page:1
            }
        }).then(({data}) => {
            const list = (data ? data : []).map((item:Memo, idx:number) => {
                item.selected = false;
                return item;
            });
            setList(list);
        });
    }
    useEffect(() => {
        if(memoList !== undefined){
            const list = JSON.parse(JSON.stringify(memoList));
            setMemo(memoList.map((item:Memo) => {
                return (
                    <MemoItem className="menu-item" key={item.id} data-id={item.id} data-selected={item.selected}
                              onClick={(e) => {
                                if((e.target as HTMLElement).getAttribute('data-selected') === 'true'){
                                    selectHandler(e, list);
                                }
                              }}>
                        <Link href={`/memo/${item.id}`}>
                            <MemoDetail>
                                <pre className="context">{item.context}</pre>
                                <div className="title">{item.title}</div>
                            </MemoDetail>
                        </Link>
                        <Selector onClick={(e) => {
                            selectHandler(e, list);
                        }}>
                            <p className="material-symbols-outlined icon-24">check</p>
                        </Selector>
                    </MemoItem>
                )
            }));
        }
    },[memoList]);
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
            {/* <Wrapper> */}

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
                        <MemoWh>
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
                                    }).then(data => getMemo());
                                    setSelectedMemo([])
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
                        </MemoWh>
                        {/* <Link href="/memo/add">
                            <AddBtnWrap>
                                <AddBtn>
                                    <RadiusButton backgroundColor={theme.name === 'dark' ? theme.colors.secondary[4] : theme.colors.primary[4]}
                                                color={theme.backgroundColor}>
                                        <div className="wrapper">
                                            <p className="material-symbols-outlined icon-48">add</p>
                                        </div>
                                    </RadiusButton>
                                </AddBtn>
                            </AddBtnWrap>
                        </Link> */}

                        <ButtonPosition>
                            <AddBtnWrap>
                                <ButtonWrap>
                                    { selectedMemo.length > 0
                                        ?
                                        <Button color={theme.name === 'dark' ? "#fff" : theme.colors.danger[4]}
                                                onClick={() => {
                                                    axios({
                                                        url:'/memo/list',
                                                        data:{
                                                            ids:selectedMemo.map(item => item.id)
                                                        },
                                                        method:'delete'
                                                    }).then(data => {
                                                        getMemo()
                                                        setSelectedMemo([])
                                                    })
                                                    setContext({
                                                        isShow : false,
                                                        x : 0,
                                                        y : 0,
                                                        id : 0
                                                    })
                                                }}>
                                            <p className="material-symbols-outlined">delete</p>
                                        </Button>
                                        :
                                        null
                                    }
                                    <Link href="/memo/add">
                                        <Button backgroundColor={theme.name === 'dark' ? theme.colors.secondary[4] : theme.colors.primary[4]}
                                                color={theme.backgroundColor}>
                                            <p className="material-symbols-outlined">add</p>
                                        </Button>
                                    </Link>
                                </ButtonWrap>
                            </AddBtnWrap>
                        </ButtonPosition>
                    </>
                }            
            {/* </Wrapper> */}
        </MemoListWrap>

    )
}

export default MemoList;