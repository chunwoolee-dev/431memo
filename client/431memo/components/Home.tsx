import styled from "styled-components";
import Header from "./Header";
import MemoList from "./MemoList";

const HomeWrap = styled.div`
    position:absolute;
    top:0; left:0;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
`

interface Props {
    email : string,
    id : number
    setUserInfo : Function
}

const Home = ({email, id, setUserInfo}:Props) => {
    return (
        <HomeWrap>
            <Header email={email} id={id} setUserInfo={setUserInfo}/>
            <MemoList />
        </HomeWrap>
    )
}

export default Home;