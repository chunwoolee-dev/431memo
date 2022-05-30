import Header from "./Header";
import MemoList from "./MemoList";

interface Props {
    email : string,
    id : number
    setUserInfo : Function
}

const Home = ({email, id, setUserInfo}:Props) => {
    return (
        <>
            <Header email={email} id={id} setUserInfo={setUserInfo}/>
            <MemoList />
        </>
    )
}

export default Home;