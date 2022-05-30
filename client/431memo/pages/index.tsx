import type { NextPage } from 'next'
import LoginStatus from '@components/LoginStatus';
import { useSession } from './api/session';

interface Props {
  session : boolean
  name : {
    id : number
    email : string
  }
}

const Home: NextPage<Props> = ({session, name}) => {

  return (
    <LoginStatus session={session} name={name}/>
  )
}

export async function getServerSideProps(context:any){
  const {name, session} = await useSession(context.req.headers.cookie);
  
  return {
    props : {
      name : name,
      session : session,
    }
  }
}


export default Home
