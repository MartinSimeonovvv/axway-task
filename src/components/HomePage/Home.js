import "../../index.css";
import homeScreenPicture from "./homePage.jpg";

const Home = () => {
  return (
    <div className="polaroid">
      <img
        className="homeimage"
        src={homeScreenPicture}
        alt="Home screen"
      ></img>
      <div className="middle">
        <div className="text">Welcome!</div>
      </div>
    </div>
  );
};

export default Home;
