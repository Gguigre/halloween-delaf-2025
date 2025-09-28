import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Root } from "./router/Root";
import { Ghost } from "./router/Ghost";
import { Leaderboard } from "./router/Leaderboard";
import { EnigmaScreen } from "./router/Enigma";
import { QRCodes } from "./router/QRCodes";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root />,
  },
  {
    path: "enigma/:enigmaId",
    element: <EnigmaScreen />,
  },
  {
    path: "/ghost/:ghostId",
    element: <Ghost />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/allCodes",
    element: <QRCodes />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
