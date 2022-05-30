import Login from "@components/Login";
import { useTheme } from "styled-components";
import Home from "./Home";
import Toast from "./toast";

interface Props {
    session : boolean
    name : {
        id : number
        email : string
    }
    err : {
        isFailed : boolean
        msg : string
    }
    setUserInfo : Function
}

const LoginStatus = ({session, name, err, setUserInfo}:Props) => {
    const theme = useTheme();
    switch (session) {
        case true :
            return (
                <Home email={name.email} id={name.id} setUserInfo={setUserInfo}/>
            )
        default :
            return (
                <>
                    {err.isFailed ? <Toast msg={err.msg} background={theme.colors.danger[4]} color={theme.colors.tertiary[0]}/> : null}
                    <Login/>
                </>
            )
    }
}

export default LoginStatus;