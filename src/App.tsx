import React, { FC } from "react";
import Styles from "./App.styles";
import { Global } from "@emotion/react";
import { AppRouter } from "./routes/app.routes";

const App: FC = () => {
  return (
    <React.Fragment>
      <Global styles={Styles}></Global>
      <AppRouter></AppRouter>
    </React.Fragment>
  );
};
export default App;
