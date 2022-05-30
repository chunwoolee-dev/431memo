import styled from 'styled-components';

const WrapperBox = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    max-width:${props => props.theme.maxWidth};
    min-height:100%;
    margin:0 auto;
    padding:${props => props.theme.space.b} ${props => props.theme.space.m};
`

interface Props {
    children:any
}

const Wrapper = function({children}:Props){
    return (
        <WrapperBox>
            {children}
        </WrapperBox>
    )
}

export default Wrapper;