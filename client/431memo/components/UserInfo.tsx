import { logout, useSession } from "@pages/api/session"
import { useRouter } from "next/router"
import styled from "styled-components"
import Modal from "./Modal"

const Wrapper = styled.div`
    padding:${props => props.theme.space.b};
`

const MenuList = styled.ul`
    overflow:hidden;
    border-radius:0 0 ${props => props.theme.space.m} ${props => props.theme.space.m};
`
const MenuItem = styled.li`
    cursor:pointer;
    position:relative;
    overflow:hidden;
    background:${props => props.theme.backgroundColor};
    border-top:${props => props.theme.border};

    &:before {
        content:'';
        background:inherit; position:absolute; top:0; left:0; width:100%; height:100%; filter:contrast(1) brightness(100%) opacity(0);
        transition:opacity 0.34s, filter 0.16s;
    }
    &:hover:before {
        filter:contrast(1.5) brightness(100%) opacity(0.4);
    }
    &:active:before {
        filter:contrast(1) brightness(75%) opacity(0.7);
    }

    .menu-item-wrap {
        display:flex;
        align-items:center;

        > .title {
            flex:1;
            display:flex;
            align-items:center;
            gap:${props => props.theme.space.s};
    
            > .msg {
                flex:1;
            }
        }
    }
`

const Thumbnail = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:${props => props.theme.space.b};

    > img {
        width:64px; height:64px; border-radius:50%;
        border:${props => props.theme.border};
    }

    & + p {
        text-align:center;
        margin-bottom:${props => props.theme.space.s};
        & + p {
            font-size:12px;
        }
    }
`

const UserInfo = function(){
    const [{session, user, err}, setValue] = useSession();
    const router = useRouter();
    
    return (
        <Modal onClose={() => router.replace(router.asPath)}>
            <Wrapper>
                <Thumbnail>
                    <img src={user && user.picture} alt="프로필 사진"></img>
                </Thumbnail>
                <p>{user && user.name}</p>
                <p>{user && user.email}</p>
            </Wrapper>

            <MenuList>
                <MenuItem onClick={async () => {
                    await logout(router, setValue);
                }}>
                    <Wrapper>
                        <div className="menu-item-wrap">
                            <p className="title">
                                <span className="msg">로그아웃</span>
                            </p>
                            <span className="material-symbols-outlined icon-16">logout</span>
                        </div>
                    </Wrapper>
                </MenuItem>
            </MenuList>
        </Modal>
    )
}

export default UserInfo;