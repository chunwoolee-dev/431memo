import styled from "styled-components";

const ProgressBar = styled.div`
    position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
`
const ProgressItem = styled.div`
    width:4px; height:24px; border-radius:4px; opacity:0.8;
    background:${props => props.theme.color};
`

const Loading = () => {
    return (
        <ProgressBar>
            <ProgressItem/>
        </ProgressBar>
    )
}

export default Loading;