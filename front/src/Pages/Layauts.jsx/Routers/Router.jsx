import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddTest from "../Pages/Add";
import Home from "../Pages/MainPage";
import Results from "../Pages/Results";
import Test from "../Pages/Test";
import paths from "./paths";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./Layouts";

const Routers = [
  {
    path: paths.home,
    Component: Home,
    exact: true,
  },
  {
    path: paths.add,
    Component: AddTest,
    exact: true,
  },
  {
    path: paths.result,
    Component: Results,
    exact: true,
  },
  {
    path: paths.test,
    Component: Test,
    exact: true,
  },
];

const RootRouter = (props) =>{
  return(


<Router>
  <Switch>
    <Layout >
      {Routers.map(({ path, Component, exact }) => (
        <Route exact={exact} path={path}></Route>
      ))}
      <Redirect to={paths.home} />
    </Layout>
  </Switch>
</Router>
  )
}


export default RootRouter;
