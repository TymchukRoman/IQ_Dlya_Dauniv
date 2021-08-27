import classes from "./styles/Profile.module.css"

const Profile = (props) => {

    return <div>
        {props.user
            ? <div>
                <div className={classes.headerDiv}>
                    Nickname: {props.user.nickname}
                </div>
                <div className={classes.inlineDivs}>
                    User type: {props.user.type}
                </div>
                <div className={classes.inlineDivs}>
                    Results: 
                    {props.user.results.length 
                    ? props.user.results.map((result) => {
                        return <div key={result} className={classes.resultDiv}> {result + ", "} </div>
                    })
                    : <div className={classes.resultDiv}>  User dont have any results </div>
                    }
                </div>
            </div>
            : <div> Waiting for user data.... </div>
        }
    </div>

};

export default Profile;
