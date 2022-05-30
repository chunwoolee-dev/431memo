import Login from "@components/Login";
import { useContext, useEffect } from "react";
import { useTheme } from "styled-components";
import Home from "./Home";
import { SessionContext } from "./Session";
import Toast from "./Toast";

const LoginStatus = () => {
    const [{session, err}] = useContext(SessionContext);
    const theme = useTheme();
    switch (session) {
        case true :
            return (
                <Home/>
            )
        case false :
            return (
                <>
                    {err.isFailed ? <Toast msg={err.msg} background={theme.colors.danger[4]} color={theme.colors.tertiary[0]}/> : null}
                    <Login/>
                </>
            )
        default :
            return (
                <></>
            )
    }
}

export default LoginStatus;