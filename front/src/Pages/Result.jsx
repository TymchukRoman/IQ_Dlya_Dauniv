import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getResult } from "../Axios/api";
import Preloader from "./Assets/Preloader";

const Profile = (props) => {

    const location = useLocation();
    const [result, setResult] = useState(null)
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    useEffect(() => {
        currentPath && getResult(String(currentPath).split("/")[2]).then(response => {
            setResult({ ...response.data })
        })
    }, [currentPath])

    return <div>

<Preloader />
        {result
            ? <div> {JSON.stringify(result)} </div>
            : <Preloader />
        }
    </div>

};

export default Profile;
