import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const TitleWrap = styled.p`
    @media screen and (max-width:${props => props.theme.media.min}){
        display:none;
    }
`

const Title = function(){
    const router = useRouter();
    const [title, setTitle] = useState('');

    useState(() => {
        switch (router.pathname){
            case '/' :
                setTitle('431Memo');
                break;
            case '/memo/[id]' :
                setTitle('메모하기');
                break;
        }
    }, []);

    return (
        <TitleWrap>{title}</TitleWrap>
    )
}

export default Title;