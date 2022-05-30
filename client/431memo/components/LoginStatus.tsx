import Login from "@components/Login";
import Home from "./Home";

interface Props {
    session : boolean
    name : {
        id : number
        email : string
    }
}

const LoginStatus = ({session, name}:Props) => {
    
    switch (session) {
        case false :
            return (
                <Login isFailed={false}/>
            )
        case true :
            return (
                <Home/>
            )
        default :
            return (
                <Login isFailed={true}/>
            )
    }
}

export default LoginStatus;