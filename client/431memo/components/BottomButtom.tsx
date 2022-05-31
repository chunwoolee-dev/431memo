import styled from "styled-components"

export const ButtonPosition = styled.div`
    display:flex;
    justify-content:flex-end;
    position:sticky;
    width:100%;
    left:0;
    bottom:24px;
`

export const ButtonWrap = styled.div`
    height:48px;
    display:flex;
    border-radius:24px;
    border:${props => props.theme.border};
    background:${props => props.theme.paper};
    overflow:hidden;
`
interface ButtonProps {
    backgroundColor ?: string
    color ?: string
}
export const Button = styled.div<ButtonProps>`
    cursor:pointer;
    display:flex;
    position:relative;
    align-items:center;
    justify-content:center;
    color:${props => props.color ? props.color : props.theme.color};
    background:${props => props.backgroundColor ? props.backgroundColor : props.theme.paper};
    width:47px;
    height:46px;

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
    .red {
        color:${props => props.theme.colors.danger[4]};
    }
    & + & {
        width:48px;
        border-left:${props => props.theme.border};
    }
`