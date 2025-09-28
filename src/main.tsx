import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Root } from "./router/Root";
import { Ghost } from "./router/Ghost";
import { Leaderboard } from "./router/Leaderboard";
import { EnigmaScreen } from "./router/Enigma";
import { QRCodes } from "./router/QRCodes";

const router = createBrowserRouter(
  [
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
  ],
  {
    basename: "/halloween-delaf-2025",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
