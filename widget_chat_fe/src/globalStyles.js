import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
    }

    svg {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
    }


    button {
        background: transparent;
        outline: none;
        border: none;
    }
`

export default GlobalStyles
