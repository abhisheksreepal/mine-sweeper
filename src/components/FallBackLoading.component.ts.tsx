import React, { FC } from "react";
import { fallbackStyle } from "../styles/fallback.style";

const FallBackLoadingComponent: FC = () => {
  return (
    <section>
      <p css={fallbackStyle}>Please Wait..</p>
    </section>
  );
};

export default FallBackLoadingComponent;
