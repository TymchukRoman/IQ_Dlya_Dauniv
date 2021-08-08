import { Route } from "react-router-dom";
import AddTest from "../Pages/Add";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/MainPage";
import Results from "../Pages/Results";
import Test from "../Pages/Test";
import paths from "./paths";

const Routers = [
  {
    path: paths.main,
    Component: Home,
    exact: true,
  },
  {
    path: paths.add,
    Component: AddTest,
    exact: true,
  },
  {
    path: paths.results,
    Component: Results,
    exact: true,
  },
  {
    path: paths.test,
    Component: Test,
    exact: true,
  },
  {
    path: paths.login,
    Component: Login,
    exact: true,
  },
  {
    path: paths.register,
    Component: Register,
    exact: true,
  },
];

const RootRouter = (props) => {
  return (
    <>
      {Routers.map(({ path, Component, exact }) => (
        <Route key={path} exact={exact} path={path}>
          {(path === "/login" || path === "/register")
            ? <Component me={props.me} />
            : <Component  />
          }
        </Route>
      ))}
    </>
  );
};

export default RootRouter;
