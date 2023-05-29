import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Quicksand', sans-serif;
    }
    body{
        background-color: #D46416;
    }
    @media (max-width: 420px) {
        *{
            -ms-overflow-style: none;
            scrollbar-width: none;  
            overflow: -moz-scrollbars-none;
        }
        ::-webkit-scrollbar {
            display: none;
    }
    }
`;

export default GlobalStyle;
