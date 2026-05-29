import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/preferenceTest.css";

import backArrow from "../assets/back-arrow.png";

function PreferenceTest() {

  const navigate = useNavigate();

  const [sliderValues, setSliderValues] = useState({
    weight: 50,
    freshness: 50,
    sweetness: 50,
    warmth: 50,
    maturity: 50,
    presence: 50
  });

  const [preferredScents, setPreferredScents] =
    useState([]);

  const [dislikedScents, setDislikedScents] =
    useState([]);

  const [usageOccasion, setUsageOccasion] =
    useState("");

  const preferredOptions = [
    "시트러스",
    "비누/클린",
    "머스크",
    "플로럴",
    "로즈",
    "프루티",
    "바닐라/달달",
    "우디",
    "그린/허브",
    "아쿠아/시원"
  ];

  const dislikedOptions = [
    "너무 단 향",
    "진한 꽃 향",
    "파우더리",
    "무거운 우디",
    "스파이시",
    "비누향",
    "머스크향",
    "풀/허브향",
    "너무 시원한 향",
    "없어요"
  ];

  const occasionOptions = [
    "학교",
    "데이트",
    "면접/발표",
    "선물",
    "여름",
    "저녁 약속"
  ];

  const handlePreferredClick = (item) => {

    if (
      preferredScents.includes(item)
    ) {

      setPreferredScents(
        preferredScents.filter(
          scent => scent !== item
        )
      );

    } else {

      setPreferredScents([
        ...preferredScents,
        item
      ]);
    }
  };

  const handleDislikedClick = (item) => {

    if (
      dislikedScents.includes(item)
    ) {

      setDislikedScents(
        dislikedScents.filter(
          scent => scent !== item
        )
      );

    } else {

      setDislikedScents([
        ...dislikedScents,
        item
      ]);
    }
  };

  const handleSubmit = () => {

    const requestData = {

      sliderValues,

      preferredScents,

      dislikedScents,

      usageOccasion
    };

    console.log(requestData);

    navigate("/loading");
  };

  return (

    <div className="preference-page">

        <div className="preference-top-bg"></div>

      <div className="preference-overlay">

        {/* 헤더 */}

        <div className="preference-header">

          <button
            className="preference-back-btn"
            onClick={() => navigate(-1)}
          >

            <img
              src={backArrow}
              alt="뒤로가기"
            />

          </button>

          <h1>
            내 향 취향 찾기
          </h1>

          <p>
            취향에 가까운 쪽으로
            드래그해주세요.
          </p>

        </div>

        {/* 01 */}

        <div className="preference-section-title">
          01. 선호하는 향 분위기
        </div>

        <div className="preference-slider-group">

          <div className="preference-slider-item">

            <span>①</span>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderValues.weight}
              onChange={(e) =>
                setSliderValues({
                  ...sliderValues,
                  weight:
                    Number(e.target.value)
                })
              }
            />

            <div className="preference-slider-labels">

              <span>가벼운 향</span>

              <span>
                무게감 있는 향
              </span>

            </div>

          </div>

          <div className="preference-slider-item">

            <span>②</span>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderValues.freshness}
              onChange={(e) =>
                setSliderValues({
                  ...sliderValues,
                  freshness:
                    Number(e.target.value)
                })
              }
            />

            <div className="preference-slider-labels">

              <span>상큼함</span>

              <span>포근함</span>

            </div>

          </div>

          <div className="preference-slider-item">

            <span>③</span>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderValues.sweetness}
              onChange={(e) =>
                setSliderValues({
                  ...sliderValues,
                  sweetness:
                    Number(e.target.value)
                })
              }
            />

            <div className="preference-slider-labels">

              <span>깨끗함</span>

              <span>달콤함</span>

            </div>

          </div>

          <div className="preference-slider-item">

            <span>④</span>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderValues.warmth}
              onChange={(e) =>
                setSliderValues({
                  ...sliderValues,
                  warmth:
                    Number(e.target.value)
                })
              }
            />

            <div className="preference-slider-labels">

              <span>시원함</span>

              <span>따뜻함</span>

            </div>

          </div>

          <div className="preference-slider-item">

            <span>⑤</span>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderValues.maturity}
              onChange={(e) =>
                setSliderValues({
                  ...sliderValues,
                  maturity:
                    Number(e.target.value)
                })
              }
            />

            <div className="preference-slider-labels">

              <span>캐주얼함</span>

              <span>성숙함</span>

            </div>

          </div>

          <div className="preference-slider-item">

            <span>⑥</span>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderValues.presence}
              onChange={(e) =>
                setSliderValues({
                  ...sliderValues,
                  presence:
                    Number(e.target.value)
                })
              }
            />

            <div className="preference-slider-labels">

              <span>은은함</span>

              <span>존재감 있는 향</span>

            </div>

          </div>

        </div>

        {/* 02 */}

        <div className="preference-section-title">
          02. 좋아하는 향 계열
        </div>

        <div className="preference-grid">

          {
            preferredOptions.map(
              (item) => (

                <button
                  key={item}
                  className={
                    preferredScents.includes(item)
                      ? "preference-option-btn selected"
                      : "preference-option-btn"
                  }
                  onClick={() =>
                    handlePreferredClick(item)
                  }
                >

                  {item}

                </button>
              )
            )
          }

        </div>

        {/* 03 */}

        <div className="preference-section-title">
          03. 싫어하는 향 계열
        </div>

        <div className="preference-grid">

          {
            dislikedOptions.map(
              (item) => (

                <button
                  key={item}
                  className={
                    dislikedScents.includes(item)
                      ? "preference-option-btn selected"
                      : "preference-option-btn"
                  }
                  onClick={() =>
                    handleDislikedClick(item)
                  }
                >

                  {item}

                </button>
              )
            )
          }

        </div>

        {/* 04 */}

        <div className="preference-section-title">
          04. 사용처
        </div>

        <div className="preference-grid">

          {
            occasionOptions.map(
              (item) => (

                <button
                  key={item}
                  className={
                    usageOccasion === item
                      ? "preference-option-btn selected"
                      : "preference-option-btn"
                  }
                  onClick={() =>
                    setUsageOccasion(item)
                  }
                >

                  {item}

                </button>
              )
            )
          }

        </div>

        <button
          className="preference-submit-btn"
          onClick={handleSubmit}
        >

          ✦ 내 취향 좌표 확인하기

        </button>

      </div>

    </div>
  );
}

export default PreferenceTest;