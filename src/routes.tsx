import React from "react";
import Home from "./views/Home";

interface Route {
  name: string;
  path: string;
  element: React.ReactElement;
}

const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
];

export default routes;
