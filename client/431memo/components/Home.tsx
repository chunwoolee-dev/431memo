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
    picture : string
    setUserInfo : Function
}

const Home = ({email, id, setUserInfo, picture}:Props) => {
    return (
        <HomeWrap>
            <Header email={email} id={id} picture={picture} setUserInfo={setUserInfo}/>
            <MemoList />
        </HomeWrap>
    )
}

export default Home;