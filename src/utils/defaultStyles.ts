import { injectGlobal } from 'styled-components'

injectGlobal`
  * {
    min-width: 0;
    min-height: 0;
  }

  html {
    box-sizing: border-box;
    overflow-y: scroll;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 14px;
    font-family: "RobotoDraft", "Roboto", "Helvetica Neue, Helvetica, Arial", sans-serif;
    line-height: 1.5;
    color: #333;
    -webkit-text-size-adjust: 100%;
    background-color: #f7f7f7;
  }

  html,
  body {
    display: flex;
    width: 100%;
    min-height: 100%;
  }

  #root {
    display: flex;
    width: 100%;
    min-height: 100%;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-size: 100%;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,
  td {
    padding: 0;
    text-align: left;
  }

  textarea {
    resize: none;
  }

  input, textarea, button, select {
    border: 0;
    outline: none;
    font: inherit;
    -webkit-font-smoothing: inherit;
  }

  input, textarea, button, select, label, a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  img, embed, iframe, object, audio, video {
    max-width: 100%;
    height: auto;
  }
`
