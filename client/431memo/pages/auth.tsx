import axios from 'axios';
import type { NextPage, NextPageContext } from 'next'

const Home: NextPage = () => {
    return (
        <></>
    )
}

export async function getServerSideProps(context:NextPageContext) {
    const code = context.query.code;
    const url = process.env.SERVER;
    const res = await axios({
        url : `${url}/callback/google`,
        method : 'post',
        data : {
            code : code
        }
    });
    return {
        // props : {
        //     test : 'good'
        // }
      redirect : {
        destination : '/',
        permanent : false
      }
    }
  }

export default Home
