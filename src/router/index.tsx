import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import Layout from "../layout";
import React from "react";
import { ROUTE_COMPONENT, ROUTE_KEY } from "./meaus";

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}


export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: "home",
    name: "首页",
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({
  ...ROUTE_CONFIG[key],
  key,
}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {routes.map((item) => {
            const Component = ROUTE_COMPONENT[item.key];
            return (
              <Route path={item.path} key={item.path} element={<Component />} />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter
