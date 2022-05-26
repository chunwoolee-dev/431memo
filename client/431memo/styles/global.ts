import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,
    body {
        font-size:16px;
        background-color:${props => props.theme.backgroundColor};
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
        -webkit-tap-highlight-color:transparent;
    }

    li {
        list-style: none;
    }

    .material-symbols-outlined {
        user-select:none;
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }

    .material-symbols-outlined.icon-48 {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
    }

    .modal {
        position:fixed; width:100%; height:100%; top:0; left:0;
    }
`;

export default GlobalStyle;