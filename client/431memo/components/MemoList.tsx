import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import RadiusButton from "./RadiusButton";

const MemoListWrap = styled.div`
    position:relative;
    flex:1;
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

const MemoList = function() {
    const [memoList, setList]:[Array<Object>|undefined, Function] = useState();
    useEffect(() => {
        axios({
            url:'/memo/list',
            data:{
                count:100,
                page:1
            }
        }).then(data => setList(data.data));
    }, []);

    return (
        <MemoListWrap>
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
                            <RadiusButton>
                                <p className="title">메모 추가</p>
                                <p className="material-symbols-outlined icon-16">add</p>
                            </RadiusButton>
                        </div>
                    </Empty>
                :
                    <div>리스트</div>
            }            
        </MemoListWrap>

    )
}

export default MemoList;