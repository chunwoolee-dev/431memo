import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,
    body {
        font-size:16px;
        color:${props => props.theme.color};
        font-family: 'Noto Sans KR', sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    li {
        list-style: none;
    }

    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
    }

    .modal {
        position:fixed; width:100%; height:100%; top:0; left:0;
    }
`;

export default GlobalStyle;