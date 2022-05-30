import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,
    body {
        width:100%; height:100%;
        font-size:16px;
        background-color:${props => props.theme.backgroundColor};
        color:${props => props.theme.color};
        font-family: 'Noto Sans KR', sans-serif;

        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        letter-spacing: normal;
        text-transform: none;
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

    .material-symbols-outlined.icon-16 {
        font-size:16px;
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 16;
    }
    .material-symbols-outlined.icon-24 {
        font-size:24px;
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }

    .material-symbols-outlined.icon-48 {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
    }

    .modal {
        position:fixed; width:100%; height:100%; top:0; left:0;
    }


    @keyframes bottom-to-top {
        from {
          transform:translate(-50%, 50vh);
          opacity:0;
        }
        to {
          transform:translate(-50%, -50%);
          opacity:1;
        }
    }
    @keyframes top-to-bottom {
        from {
          transform:translate(-50%, -50%);
          opacity:1;
        }
        to {
          transform:translate(-50%, 50vh);
          opacity:0;
        }
    }
    @keyframes fade-in {
        from {
          opacity:0;
        }
        to {
          opacity:1;
        }
    }
    @keyframes fade-out {
        from {
          opacity:1;
        }
        to {
          opacity:0;
        }
    }
`;

export default GlobalStyle;