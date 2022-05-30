import type { NextPage } from 'next'
import LoginStatus from '@components/LoginStatus';
import { useSession } from './api/session';
import UserInfo from '@components/UserInfo';
import { useState } from 'react';

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

const Home: NextPage<Props> = ({session, name, err}) => {
  const [isUserInfo, setUserInfo] = useState(false);
  console.log(name);
  return (
    <>
      {isUserInfo ? <UserInfo session={session} name={name} err={err} setUserInfo={setUserInfo}/> : null}
      <LoginStatus session={session} name={name} err={err} setUserInfo={setUserInfo}/>
    </>
  )
}

export async function getServerSideProps(context:any){
  const {name, session, err} = await useSession(context.req.headers.cookie);
  
  return {
    props : {
      name : name,
      session : session,
      err : err
    }
  }
}


export default Home
