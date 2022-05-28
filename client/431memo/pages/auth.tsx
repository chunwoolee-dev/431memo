import axios from 'axios';
import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  code : string
}

const Home: NextPage<Props> = (props) => {
  const router = useRouter();
  useEffect(() => {
    const code = props.code;
    const url = process.env.SERVER;
    if(code){
      axios({
          url : `${url}/callback/google`,
          method : 'post',
          data : {
              code : code
          },
          withCredentials : true
      })
      .then(() => router.push("/"))
      .catch(() => router.push("/"));
    }
  }, []);

  return (
      <></>
  )
}

export async function getServerSideProps(context:NextPageContext) {
  const code = context.query.code;
  return {
    props : {
        code : code
    }
  }
}

export default Home
