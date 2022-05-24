import type { NextPage } from 'next'
import isLogin from './api/isLogin';

const Home: NextPage = () => {
  return (
    <div style={{
      display:'flex',
      gap:8,
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%, -50%)'
    }}>
      <div className="material-symbols-outlined icon-big">
        today
      </div>
      <h1>
        431Memo
      </h1>
    </div>
  )
}

export default Home
