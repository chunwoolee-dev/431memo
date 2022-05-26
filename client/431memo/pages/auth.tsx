import axios from 'axios';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const code = useRouter().query.code;
    const url = process.env.SERVER;
    axios({
        url : `${url}/callback/google`,
        method : 'post',
        data : {
            code : code
        }
    }).then(() => location.href='/');
    return (
        <></>
    )
}

export default Home
