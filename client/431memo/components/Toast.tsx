import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
    background?:string
    color?:string
    position?:string
    msg:string
}

interface ToastBoxProps {
    background?:string
    color?:string
    position?:string
}

const ToastBox = styled.div<ToastBoxProps>`
    position:absolute;
    top:16px; left:50%; transform:translate(-50%, 0);
    background:${props => props.background ? props.background : props.theme.paper};
    color:${props => props.color ? props.color : props.theme.color};
    padding:${props => props.theme.space.m};
    border-radius:${props => props.theme.space.s};
`

const Toast = function({msg, background, color, position}:Props){
    const [isShow, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }, []);
    return (
        isShow ?
            <ToastBox background={background} color={color} position={position}>
                {msg}
            </ToastBox>
        :
            null
    )
}

export default Toast;