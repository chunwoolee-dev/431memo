import { signOut, useSession } from "next-auth/react";
import Loading from "./Loading";
import Login from "@components/Login";

const LoginStatus = () => {
    const {status} = useSession();
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
                <div>
                    <p>로그아웃</p>
                    <button type="button" onClick={() => signOut()}>로그아웃</button>
                </div>
            )
    }
}

export default LoginStatus;