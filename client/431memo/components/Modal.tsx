import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalWrap = styled.div`
    z-index:9;
    position:fixed;
`
const ModalFill = styled.div<ModalWrapProps>`
    position:fixed;
    top:0; left:0; right:0; bottom:0;
    background:rgba(0,0,0,0.2);        
    ${props => props.isClosing ? props.theme.animation['fade-out'] : props.theme.animation['fade-in']};
`
const ModalBox = styled.div<ModalWrapProps>`
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    background:${props => props.theme.backgroundColor};
    color:${props => props.theme.color};
    border:${props => props.theme.border};
    border-radius:${props => props.theme.space.m};
    ${props => props.isClosing ? props.theme.animation['top-to-bottom'] : props.theme.animation["bottom-to-top"]};
`

interface ModalWrapProps {
    isClosing : boolean
}

const Modal = function(props:any){
    const [isClose, setClose] = useState(false);
    const [isClosing, setClosing] = useState(false);
    return (
        isClose ? null :
        <ModalWrap>
            <ModalFill isClosing={isClosing} onClick={(e) => {
                setClosing(true);
                const hnd = (e:any) => {
                    e.target.removeEventListener('animationend', hnd);
                    setClose(true);
                    props.onClose && props.onClose();
                };
                e.target.addEventListener('animationend', hnd)
            }}/>
            <ModalBox isClosing={isClosing}>
                {props.children}
            </ModalBox>
        </ModalWrap>
    )
}

export default Modal;