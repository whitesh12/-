import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/loading.css";

import background from "../assets/background.png";
import logo from "../assets/logo.png";

function Loading() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/preference-test");

    }, 2500);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div className="loading-page">

      <img
        src={background}
        alt=""
        className="loading-bg"
      />

      <div className="loading-overlay"></div>

      <img
        src={logo}
        alt=""
        className="loading-logo"
      />

      <h1 className="loading-title">
        Scent Orbit
      </h1>

      <p className="loading-text">
        나만의
        <br />
        향수 좌표를
        <br />
        찾는 중...
      </p>

    </div>
  );
}

export default Loading;