import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: hidden;
    *:focus {outline:none !important};
  :root {
      font-size: 20px;
      font-family: "Gill Sans", "Gill Sans MT", sans-serif;

      @media (min-width: 768px) {
        font-size: 18px;
      }

      @media (min-width: 1024px) {
        font-size: 16px;
      }
    }
`;

export default GlobalStyle;
