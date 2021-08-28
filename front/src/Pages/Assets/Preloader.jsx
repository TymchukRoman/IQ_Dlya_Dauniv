import classes from "../styles/Preloader.module.css"

const Preloader = () => {
    return <div className={classes.preloader}>
      <img className={classes.preloaderimg} src="./svg/preloader.svg" alt="preloader"/>
    </div>;
};

export default Preloader;
  