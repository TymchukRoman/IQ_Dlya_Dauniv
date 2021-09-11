import classes from "./styles/Profile.module.css"
import { Button } from "react-bootstrap";
import Preloader from "./Assets/Preloader";

const Profile = (props) => {

    const logout = () => {
        localStorage.setItem("token", "");
        props.me()
    }

    return <>
        {props.user
            ? <div className={classes.container}>
                <div className={classes.UserData}>
                    <div className={classes.UserIcon}>
                        <img className={classes.usericon} src={props.user.img ? props.user.img : "/userProfileIcon.png"} loading="/userProfileIcon.png" alt="user icon" />
                    </div>
                    <div className={classes.UserNicknameStatus}>
                        <h3>{props.user.nickname}</h3>   <Button onClick={logout}>Logout</Button>
                    </div>
                    <div className={classes.UserPersonalData}>
                        Personal user data Personal user data Personal user data
                        Personal user data Personal user data Personal user data
                        Personal user data Personal user data Personal user data
                        Personal user data Personal user data Personal user data
                        Personal user data Personal user data Personal user data
                    </div>
                </div>
                <div className={classes.Results}>
                    {props.user.results.length
                        ? props.user.results.map((result) => {
                            return <div key={result} className={classes.resultDiv}> {result + ", "} </div>
                        })
                        : <div className={classes.resultDiv}>  User dont have any results </div>
                    }
                </div>
            </div>
            : <Preloader />
        }
    </>

};

export default Profile;

// <div>
//                 <div className={classes.headerDiv}>
//                     Nickname: {props.user.nickname}  <Button onClick={logout}>Logout</Button>
//                 </div>
//                 <div className={classes.inlineDivs}>
//                     User type: {props.user.type}
//                 </div>
//                 <div className={classes.inlineDivs}>
//                     Results: 
                    // {props.user.results.length 
                    // ? props.user.results.map((result) => {
                    //     return <div key={result} className={classes.resultDiv}> {result + ", "} </div>
                    // })
                    // : <div className={classes.resultDiv}>  User dont have any results </div>
                    // }
//                 </div>
//             </div>