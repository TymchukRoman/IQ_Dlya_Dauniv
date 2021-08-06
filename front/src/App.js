import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./Pages/NavigationBar";
import RootRouter from "./Routers/RootRouter";
import { BrowserRouter } from "react-router-dom";

export default function App() {

  return (
    <BrowserRouter>
      <NavigationBar />
      <RootRouter />
    </BrowserRouter>
  );
}
