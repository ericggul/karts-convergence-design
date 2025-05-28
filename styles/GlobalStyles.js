import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.primary};
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    line-height: 1.4;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #__next {
    min-height: 100vh;
    width: 100vw;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.accent};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Hide focus for mouse users */
  .js-focus-visible *:focus:not(.focus-visible) {
    outline: none;
  }
`; 