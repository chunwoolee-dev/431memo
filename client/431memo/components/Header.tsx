import { useSession } from "@pages/api/session";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { useTheme } from "styled-components";
import Title from './Title';
import RadiusButton from "./RadiusButton";
import UserInfo from "./UserInfo";

const HeaderBlock = styled.header`
    width:100%; height:64px;
    background:${props => props.theme.backgroundColor}99;
    backdrop-filter:blur(6px);
`

const HeaderSection = styled.div`
    width:100%; height:100%;
    // max-width:${props => props.theme.maxWidth};
    // margin:0 auto;
    padding:0 ${props => props.theme.space.m};
    display:flex; align-items:center;
`

const HeaderArea = styled.div`
    flex:1; gap:${props => props.theme.space.m};
    display:flex; align-items:center;

    & + & {
        justify-content:flex-end;
    }
`

const UserInfoWrap = styled.div`
    display:flex;
    align-items:center;
    gap:${props => props.theme.space.m};
    > p {
        @media screen and (max-width:${props => props.theme.media.min}){
            display:none;
        }
    }
`
const Thumbnail = styled.img`
    width:24px; height:24px; border-radius:50%;
    border:${props => props.theme.border};
`;

const Header = () => {
    const [{session, user, err}] = useSession();
    const router = useRouter();
    const theme = useTheme();
    
    return (
        <>
            {router.query['user-detail'] === 'true' ? <UserInfo/> : null}
            <HeaderBlock>
                <HeaderSection>
                    <HeaderArea>
                        {router.pathname === '/memo/[id]' ?
                        <div onClick={router.back}>
                            <RadiusButton backgroundColor={theme.backgroundColor} color={theme.color}>
                                <p className="material-symbols-outlined">keyboard_arrow_left</p>
                            </RadiusButton>
                        </div>
                        : null}
                        <Title />
                        {/* <div>
                            <RadiusButton backgroundColor={theme.backgroundColor} color={theme.color}>
                                <p className="material-symbols-outlined icon-16">menu</p>
                            </RadiusButton>
                        </div> */}
                    </HeaderArea>
                    <HeaderArea>
                        <div>
                            <Link href="?user-detail=true" as={router.asPath}>
                                <RadiusButton backgroundColor={theme.backgroundColor} color={theme.color}>
                                    <UserInfoWrap>
                                        <p>{user && user.name}</p>
                                        { user ? 
                                            <Thumbnail src={user.picture} alt="????????? ??????"/>
                                            : null
                                        }
                                    </UserInfoWrap>
                                </RadiusButton>
                            </Link>
                        </div>
                    </HeaderArea>
                </HeaderSection>
            </HeaderBlock>
        </>
    )
}

export default Header;