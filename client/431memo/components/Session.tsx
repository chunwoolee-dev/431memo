import { getSession } from "@pages/api/session";
import { useRouter } from "next/router";
import { Context, createContext, useContext, useEffect, useState } from "react";

interface Props {
    session : boolean
    name : {
      id : number
      email : string
      picture : string
    },
    err : {
      isFailed : boolean
      msg : string
    }
  }

export const SessionContext = createContext<any>([{
    session : false,
    name : {
        id : 0,
        email : '',
        picture : ''
      },
    err : {
      isFailed : false,
      msg : ''
    }
}, null]);

const SessionProvider = (props:any) => {
    const [value, setValue]:[Context<Props>, Function] = useState(SessionContext);
    const router = useRouter();
    useEffect(() => {
        getSession(document.cookie).then(data => {
            setValue({...data});
        });
    }, []);

    return (
        <SessionContext.Provider value={[value, setValue]}>
            {props.children}
        </SessionContext.Provider>
    )
}

export default SessionProvider;