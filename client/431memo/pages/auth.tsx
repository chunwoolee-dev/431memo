import Loading from '@components/Loading';
import axios from 'axios';
import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { getSession, useSession } from './api/session';

const ProgressBar = styled.div`
    position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
`
const ProgressItem = styled.div`
    width:48px; height:48px;
`

interface Props {
  code : string
}

const Home: NextPage<Props> = (props) => {
  const [$data, setSession] = useSession();
  const router = useRouter();
  if($data.session){
    router.replace("/");
  }
  useEffect(() => {
    const code = props.code;
    if(code){
      axios({
          url : `/callback/google`,
          method : 'post',
          data : {
              code : code
          }
      })
      .then(() => {
        router.replace("/");
        getSession(document.cookie).then((data) => {
          setSession({...data});
        })
      })
      .catch(() => router.replace("/"));
    }
  }, []);

  return (
    <ProgressBar>
      <ProgressItem>
        <Loading/>
      </ProgressItem>
    </ProgressBar>
  )
}

export async function getServerSideProps(context:NextPageContext) {
  const code = context.query.code;
  if(!code){
    return {
      redirect : {
        destination: '/',
        permanent: false,
      }
    }
  }else{
    return {
      props : {
          code : code
      }
    }
  }
}

export default Home
