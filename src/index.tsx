import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

// Clear the existing HTML content
document.body.innerHTML = '<div id="mine-app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("mine-app") as HTMLElement);
root.render(<App></App>);
