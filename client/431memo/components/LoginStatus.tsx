import { useSession } from "next-auth/react";
import Login from "@components/Login";
import Home from "./Home";

const LoginStatus = () => {
    const {data, status} = useSession();
    switch (status) {
        case 'loading' :
            return (
                <></>
            )
        case 'unauthenticated' :
            return (
                <Login/>
            )
        case 'authenticated' :
            return (
                <Home/>
            )
    }
}

export default LoginStatus;