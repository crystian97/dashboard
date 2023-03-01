import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
    padding: 0;
    margin:0;
    font-family: 'Inter', sans-serif;;
}
body{
    background-color:${(props) => props.theme["violet-400"]};
    padding: 7rem 7.688rem;
    color: ${(props) => props.theme["white"]};
    height: 100vh;
}
`;
