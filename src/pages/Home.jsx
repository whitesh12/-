import "../styles/home.css";

import background from "../assets/background.png";
import logo from "../assets/logo.svg";

import earth from "../assets/earth.png";
import planet1 from "../assets/planet1.png";
import planet2 from "../assets/planet2.png";
import orbit from "../assets/orbit.svg";

import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* 검은 오버레이 */}
      <div className="overlay"></div>

      {/* 행성 */}

      <img src={orbit} alt="orbit" className="orbit-svg" />

      {/* 메인 콘텐츠 */}
      <div className="content">
        <img src={logo} className="logo" />

        <h1 className="title">Scent Orbit</h1>

        <p className="subtitle">
          향수의 우주에서,
          <br />
          내 취향의 좌표를 찾다.
        </p>

        <button 
        className="gold-btn"
        onClick={() => navigate("/loading")}
        >
            <div className="gold-inner">
                ✦ 향 취향 찾기
            </div>
        </button>

        <button 
        className="main-btn purple"
        onClick={() => navigate("/translate")}
        >
          ✦ 향수어 번역하기
        </button>

        <div className="info-card">
          로그인 없이 누구나 이용 가능
          <br />
          한 번의 간편한 테스트로 향수를 추천받아요.
        </div>
      </div>
    </div>
  );
}

export default Home;