import { useEffect, useState } from "react";
import { getLeaderboards } from "../Axios/api";


const Leaderboards = () => {

  const [leaderboards, setLeaderboards] = useState([])

  useEffect(() => {
    getLeaderboards().then((res) => {
      setLeaderboards([...res.data.top])
    })
  }, [])

  return <div>
    {leaderboards.map((item) => {
      return <p key={item.name}>
        {item.name} Score: {item.points}
      </p>
    })}
  </div>;
};
export default Leaderboards;
