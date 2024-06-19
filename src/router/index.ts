import { Backend } from "@/views/backend/backend";
import home from "@/views/home/home";
import { createElement } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(Navigate, { to: "/home" }),
  },
  {
    path: "home",
    Component: home,
  },
  {
    path: "backend",
    Component: Backend,
  },
]);
