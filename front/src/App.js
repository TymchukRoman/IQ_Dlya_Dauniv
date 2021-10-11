import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./Pages/NavigationBar";
import RootRouter from "./Routers/RootRouter";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { meAPI } from "./Axios/api";

export default function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      me(token)
    }
  }, [])

  const me = () => {
    let token = localStorage.getItem('token')
    if (token && token !== "undefined") {
      meAPI(token).then((res) => {
        if (res.data.err) {
          console.log(res.data.err, token)
          localStorage.setItem("token", "")
        } else {
          setUser({ ...res.data })
        }
      })
    } else {
      setUser(null)
    }
  }

  return (
    <BrowserRouter>
      <NavigationBar user={user} me={me} />
      <RootRouter user={user} me={me} />
    </BrowserRouter>
  );
}
