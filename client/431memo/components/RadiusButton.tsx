import styled from "styled-components";
interface Props {
    backgroundColor: string|undefined;
    color: string|undefined;
}

const Button = styled.button<Props>`
    border:0; border-radius:9999px; width:100%; display:flex; justify-content:center; align-items:center; cursor:pointer;
    position:relative; overflow:hidden;
    background:${props => props.backgroundColor ? props.backgroundColor : props.theme.colors.tertiary[1]};
    color:${props => props.color ? props.color : props.theme.colors.tertiary[8]};
    padding:${props => props.theme.space.m} ${props => props.theme.space.b};

    > div.hover {
        background:inherit; position:absolute; top:0; left:0; width:100%; height:100%; filter:contrast(0.75) brightness(2);
        opacity:0; transition:opacity 0.34s, filter 0.16s;
    }
    &:hover > div.hover {
        opacity:0.4;
    }
    &:active > div.hover {
        filter:contrast(0.75) brightness(0.5);
    }
`

const RadiusButton = (props:any) => {
    return (
        <Button type="button" onClick={props.onClick} backgroundColor={props.backgroundColor} color={props.color}>
            {props.children}
            <div className="hover"></div>
        </Button>
    )
}

export default RadiusButton;