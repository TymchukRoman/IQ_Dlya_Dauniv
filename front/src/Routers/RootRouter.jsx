import { Route } from "react-router-dom";
import AddTest from "../Pages/Add";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/MainPage";
import Leaderboards from "../Pages/Leaderboards";
import Test from "../Pages/Test";
import Result from "../Pages/Result";
import Profile from "../Pages/Profile";
import { paths, adminPaths } from "./paths";
import AdminPanel from "../Pages/Admin/AdminPanel";

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
    path: paths.leaderboards,
    Component: Leaderboards,
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
  {
    path: paths.profile,
    Component: Profile,
    exact: true,
  },
  {
    path: paths.result,
    Component: Result,
    exact: false,
  },
];

const AdminRouters = [
  {
    path: adminPaths.adminPanel,
    Component: AdminPanel,
    exact: true,
  },
];

const RootRouter = (props) => {
  return (
    <>
      {props.user &&
        props.user.type === "admin" &&
        AdminRouters.map(({ path, Component, exact }) => {
          return (
            <Route key={path} exact={exact} path={path}>
              <Component />
            </Route>
          );
        })}
      {Routers.map(({ path, Component, exact }) => (
        <Route key={path} exact={exact} path={path}>
          {path === "/login" || path === "/register" ? (
            <Component me={props.me} />
          ) : path === "/profile" ? (
            <Component user={props.user} me={props.me} />
          ) : path === "/add" ? (
            <Component user={props.user} />
          ) : (
            <Component />
          )}
        </Route>
      ))}
    </>
  );
};

export default RootRouter;
