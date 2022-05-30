import type { NextPage } from 'next'
import LoginStatus from '@components/LoginStatus';

const Home: NextPage = () => {
  return (
    <>
      <LoginStatus/>
    </>
  )
}

// export async function getServerSideProps(context:any){
//   const {name, session, err} = await getSession(context.req.headers.cookie);
  
//   return {
//     props : {
//       name : name,
//       session : session,
//       err : err
//     }
//   }
// }


export default Home
