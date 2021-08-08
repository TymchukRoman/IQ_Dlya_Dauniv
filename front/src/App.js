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
        setUser({
          nickname: res.data.nickname
        })
      })
    } else {
      setUser(null)
    }
  }

  return (
    <BrowserRouter>
      <NavigationBar user={user} me={me} />
      <RootRouter me={me} />
    </BrowserRouter>
  );
}
