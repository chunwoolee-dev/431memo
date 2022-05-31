import styled from "styled-components"

interface ContextWrap {
    x:number
    y:number
}
const ContextWrap = styled.div<ContextWrap>`
    position:absolute;
    top:${props => props.y - 64}px;
    left:${props => props.x}px;
    border:${props => props.theme.border};
    border-radius:${props => props.theme.space.s};
    padding:${props => props.theme.space.m};
    background:${props => props.theme.paper};
    display:flex;
    gap:${props => props.theme.space.m};
    cursor:pointer;
    white-space:nowrap;
    &:hover {
        background:${props => props.theme.colors.danger[4]};
        color:#fff;
    }
`

interface Props {
    x:number
    y:number
    id:number
    onClick:any
}

const ContextMenu = ({x, y, id, onClick}:Props) => {
    return (
        <ContextWrap x={x} y={y} onClick={onClick}>
            <p>삭제</p>
            <p className="material-symbols-outlined">delete</p>
        </ContextWrap>
    )
}

export default ContextMenu;