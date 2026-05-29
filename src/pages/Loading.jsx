import "../styles/loading.css";

import background from "../assets/background.png";
import logo from "../assets/logo.png";
import perfume from "../assets/perfume.png";

function Loading() {
  return (
    <div className="loading-page">

      <img src={background} alt="" className="loading-bg" />

      <div className="loading-overlay"></div>

      <img src={logo} alt="" className="loading-logo" />

      <h1 className="loading-title">
        Scent Orbit
      </h1>

     

      <p className="loading-text">
        나만의 <br />
        향수 좌표를 <br />
        찾는 중...
      </p>

    </div>
  );
}

export default Loading;