import { useRouter } from "next/router";
import styled, { useTheme } from "styled-components";
import RadiusButton from "./RadiusButton";

const HeaderBlock = styled.header`
    width:100%; height:64px;
    background:${props => props.theme.backgroundColor}99;
    backdrop-filter:blur(6px);
`

const HeaderSection = styled.div`
    width:100%; height:100%;
    padding:0 ${props => props.theme.space.b};
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
`
const Thumbnail = styled.img`
    width:24px; height:24px; border-radius:50%;
    border:${props => props.theme.border};
`;

interface Props {
    email:string
    id:number
    picture:string
    setUserInfo:Function
}

const Header = ({email, id, setUserInfo, picture}:Props) => {
    const theme = useTheme();
    const router = useRouter();
    const reg = /\@gmail\.com$/;
    const name  = reg.test(email) ? email.replace(reg,'') : email;
    return (
        <HeaderBlock>
            <HeaderSection>
                <HeaderArea>
                    <div>
                        <RadiusButton backgroundColor={theme.backgroundColor} color={theme.color}>
                            <p className="material-symbols-outlined icon-16">menu</p>
                        </RadiusButton>
                    </div>
                </HeaderArea>
                <HeaderArea>
                    <div>
                        <RadiusButton backgroundColor={theme.backgroundColor} color={theme.color} onClick={() => setUserInfo(true)}>
                            <UserInfoWrap>
                                <Thumbnail src={picture} alt="프로필 사진"/>
                                <p>{name}</p>
                            </UserInfoWrap>
                        </RadiusButton>
                    </div>
                </HeaderArea>
            </HeaderSection>
        </HeaderBlock>
    )
}

export default Header;