import { signOut } from "next-auth/react";
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

const Header = () => {
    const theme = useTheme();
    return (
        <HeaderBlock>
            <HeaderSection>
                <HeaderArea>
                    <div>
                        <RadiusButton backgroundColor={theme.backgroundColor} color={theme.color}>
                            <p className="material-symbols-outlined">menu</p>
                        </RadiusButton>
                    </div>
                </HeaderArea>
                <HeaderArea>
                    이름
                    <button type="button" onClick={() => signOut()}>로그아웃</button>
                </HeaderArea>
            </HeaderSection>
        </HeaderBlock>
    )
}

export default Header;