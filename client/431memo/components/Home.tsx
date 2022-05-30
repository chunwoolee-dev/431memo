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

const Home = () => {
    return (
        <HomeWrap>
            <Header />
            <MemoList />
        </HomeWrap>
    )
}

export default Home;