import styled from "styled-components";
import RadiusButton from "./RadiusButton";

const LoginModal = styled.div`
  width:480px;
  height:640px;
  max-height:90%;
  padding:16px;
  border-radius:36px;
  background:${props => props.theme.backgroundColor};
  border:${props => props.theme.border[0]};
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  animation:bottom-to-up 0.64s;
  gap:${props => props.theme.space.m};

  > .title-section {
    flex:1;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    > .material-symbols-outlined {
      font-size:4em;
    }
  }
  > .title-section.top {
    justify-content:flex-start;
  }

  @media screen and (max-width:${props => props.theme.media.mobile}){
    width:100%;
    height:100%;
    max-height:100%;
    border-radius:0;
    border:0;
    padding-bottom:calc(16px + env(safe-area-inset-bottom));
  }

  @keyframes bottom-to-up {
    from { opacity:0; transform:translate(-50%, -45%); }
    to   { opacity1;  transform:translate(-50%, -50%); }
  }
`
const ButtonStyle = styled.div`
  display:flex;
  position:relative;
  justify-content:center;
  align-items:center;
  width:100%;
  height:32px;
  font-weight:bold;
  gap:${props => props.theme.space.m};
  
  >svg {
    position:absolute;
    left:0; top:50%;
    transform:translateY(-50%);
  }
`

const Failed = styled.div`
  position:absolute;
  top:16px;
  left:50%;
  transform:translate(-50%, 0);
  padding:${props => props.theme.space.s};
  background:${props => props.theme.colors.danger[4]};
  border-radius:${props => props.theme.space.s};
  font-weight:bold;
  animation:fade-in 0.34s 2s reverse both;

  @keyframes fade-in {
    from {
      transform:translate(-50%, -50%);
      opacity:0;
    }
    to {
      transform:translate(-50%, 0);
      opacity:1;
    }
  }
`

const Login = ({isFailed}:{isFailed:boolean}) => {
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXTAUTH_URL}${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  
  return (
    <div className="modal">
      <LoginModal>
        {isFailed ? <Failed>로그인 실패</Failed> : ''}
        <div className="title-section">
          <p className="material-symbols-outlined icon-48">description</p>
        </div>
        <div className="title-section top">
          <h1>431Memo</h1>
          <p>간단하게 메모하기</p>
        </div>
        <RadiusButton onClick={() => location.href=GOOGLE_LOGIN_URL}>
        {/* <RadiusButton onClick={() => signIn('google')}> */}
          <ButtonStyle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <p>구글로 시작</p>
          </ButtonStyle>
        </RadiusButton>
      </LoginModal>
    </div>
  )
}


export default Login;