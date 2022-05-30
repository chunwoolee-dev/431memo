import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const MemoList = function() {
    const [memoList, setList] = useState();
    axios({
        url:'/memo/list',
        data:{
            count:100,
            page:1
        }
    }).then(data => setList(data.data));
    useEffect(() => {
        console.log(memoList);
    }, [memoList]);
    return (
        memoList === undefined ?
            <Loading/>
            :
            <div>리스트</div>
    )
}

export default MemoList;