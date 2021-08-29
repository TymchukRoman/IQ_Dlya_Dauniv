import { useEffect, useState } from "react";
import { getLeaderboards } from "../Axios/api";
import classes from "./styles/Top.module.css"

const Leaderboards = () => {

  const [leaderboards, setLeaderboards] = useState([])

  useEffect(() => {
    getLeaderboards().then((res) => {
      setLeaderboards([...res.data.top])
    })
  }, [])

  return <div>
    {leaderboards.length
      ? <div>
        <div className={classes.first + " " + classes.topitem}>
          <h4>{leaderboards[0].name}</h4>
          <p> Total score: {leaderboards[0].points}</p>
        </div>
        <div className={classes.second + " " + classes.topitem}>
          <h4>{leaderboards[1].name}</h4>
          <p>Total score: {leaderboards[1].points}</p>
        </div>
        <div className={classes.third + " " + classes.topitem}>
          <h4>{leaderboards[2].name}</h4>
          <p>Total score: {leaderboards[2].points}</p>
        </div>
      </div>
      : <p>Wait for data...</p>
    }
  </div>;
};
export default Leaderboards;
