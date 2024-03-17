import React, { FC } from "react";
import { welcomeMessageStyle } from "../styles/welcome.style";

const WelcomeComponent: FC = () => {
  return (
    <section>
      <p css={welcomeMessageStyle}>
        Welcome to Mine Sweeper Game. Please click Launch button to Start game
      </p>
    </section>
  );
};

export default WelcomeComponent;
