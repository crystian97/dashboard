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
    padding: 2rem 0 2rem 0;
    color: ${(props) => props.theme["white"]};
    height: 100vh;
}
`;
