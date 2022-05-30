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
            삭제
        </ContextWrap>
    )
}

export default ContextMenu;