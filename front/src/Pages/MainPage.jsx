import classes from "./styles/MainPage.module.css"

const Home = () => {
  return <div className={classes.container + " " + classes.gridElement}>
    <div className={classes.FastNavigation + " " + classes.gridElement}>
      <p>Nav el icon</p>
      <p>Nav el icon</p>
      <p>Nav el icon</p>
      <p>Nav el icon</p>
      <p>Nav el icon</p>
      <p>Nav el icon</p>
      <p>Nav el icon</p>
      <p>Nav el icon</p>
    </div>
    <div className={classes.HeadLine + " " + classes.gridElement}>
      <h1>Hello, Friend, wellcome to our question library!</h1>
    </div>
    <div className={classes.Chat + " " + classes.gridElement}>Chat</div>
    <div className={classes.NewsContainer + " " + classes.gridElement}>
      <div>
        <h3>New header</h3>
        <p>New text</p>
        <p>New functional elements</p>
      </div>

      <div>
        <h3>New header</h3>
        <p>New text</p>
        <p>New functional elements</p>
      </div>

      <div>
        <h3>New header</h3>
        <p>New text</p>
        <p>New functional elements</p>
      </div>

      <div>
        <h3>New header</h3>
        <p>New text</p>
        <p>New functional elements</p>
      </div>

      <div>
        <h3>New header</h3>
        <p>New text</p>
        <p>New functional elements</p>
      </div>

    </div>
    <div className={classes.Notification + " " + classes.gridElement}>
      <p>Notification</p>
      <p>Notification</p>
      <p>Notification</p>
      <p>Notification</p>
    </div>
  </div>
};
export default Home;
