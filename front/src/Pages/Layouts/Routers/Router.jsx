import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddTest from "../Pages/Add";
import Home from "../Pages/MainPage";
import Results from "../Pages/Results";
import Test from "../Pages/Test";
import paths from "./paths";
import Layout from "./Layouts";

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
];

const RootRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Layout>
          {Routers.map(({ path, Component, exact }) => (
            <Route key={path} exact={exact} path={path}>
              <Component />
            </Route>
          ))}
        </Layout>
      </Switch>
    </Router>
  );
};

export default RootRouter;
