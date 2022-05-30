import styled from "styled-components";
interface ButtonProps {
    backgroundColor: string|undefined;
    color: string|undefined;
}

const Button = styled.button<ButtonProps>`
    border:0; border-radius:9999px; width:100%; display:flex; justify-content:center; align-items:center; cursor:pointer;
    gap:${props => props.theme.space.s};
    position:relative; overflow:hidden;
    font-size:14px; user-select:none;
    background:${props => props.backgroundColor ? props.backgroundColor : props.theme.colors.tertiary[1]};
    color:${props => props.color ? props.color : props.theme.colors.tertiary[8]};
    padding:${props => props.theme.space.m} ${props => props.theme.space.b};

    > div.hover {
        background:inherit; position:absolute; top:0; left:0; width:100%; height:100%; filter:contrast(1) brightness(100%) opacity(0);
        transition:opacity 0.34s, filter 0.16s; border-radius:9999px;
    }
    &:hover > div.hover {
        filter:contrast(1.5) brightness(100%) opacity(0.4);
    }
    &:active > div.hover {
        filter:contrast(1) brightness(75%) opacity(0.7);
    }

    > .title {
        line-height:1;
        font-weight:bold;
    }
`

interface Props {
    onClick ?: any
    backgroundColor ?: string
    color ?: string
    children ?: any
}

const RadiusButton = (props:Props) => {
    return (
        <Button type="button" onClick={props.onClick} backgroundColor={props.backgroundColor} color={props.color}>
            <div className="hover"></div>
            {props.children}
        </Button>
    )
}

export default RadiusButton;