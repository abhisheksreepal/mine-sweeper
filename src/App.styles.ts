import { css } from "@emotion/react";

import prismSvg from "./assets/svgs/prism.svg";

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    background-image: url(${prismSvg});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export default styles;
