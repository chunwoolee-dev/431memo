import Login from "@components/Login";
import Home from "./Home";

const LoginStatus = () => {
    const {data, status} = {data:'hi', status:'unauthenticated'};
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