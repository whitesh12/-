import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/preferenceTest.css";

import backArrow from "../assets/back-arrow.png";
import dateImage from "../test-image/date.png";
import nightImage from "../test-image/night.png";
import presentImage from "../test-image/present.png";
import presentationImage from "../test-image/presentation.png";
import schoolImage from "../test-image/school.png";
import summerImage from "../test-image/summer.png";

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
    {
      title: "시트러스",
      description: "레몬, 오렌지처럼 상큼한 향"
    },
    {
      title: "비누/클린",
      description: "막 씻고 나온 듯 깨끗한 향"
    },
    {
      title: "머스크",
      description: "포근한 살냄새, 섬유유연제 느낌"
    },
    {
      title: "플로럴",
      description: "꽃집처럼 화사한 꽃향"
    },
    {
      title: "로즈",
      description: "장미 중심의 향"
    },
    {
      title: "프루티",
      description: "복숭아, 사과, 베리 같은 과일향"
    },
    {
      title: "바닐라/달달",
      description: "디저트처럼 달콤한 향"
    },
    {
      title: "우디",
      description: "나무, 숲, 차분한 향"
    },
    {
      title: "그린/허브",
      description: "풀, 차, 허브처럼 자연스러운 향"
    },
    {
      title: "아쿠아/시원",
      description: "물기, 바람, 여름 느낌의 향"
    }
  ];

  const dislikedNoneOption = "❌없어요";

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
    dislikedNoneOption
  ];

  const occasionOptions = [
    {
      image: schoolImage,
      label: "학교"
    },
    {
      image: dateImage,
      label: "데이트"
    },
    {
      image: presentationImage,
      label: "면접/발표"
    },
    {
      image: presentImage,
      label: "선물"
    },
    {
      image: summerImage,
      label: "여름"
    },
    {
      image: nightImage,
      label: "저녁 약속"
    }
  ];

  const sliderOptions = [
    {
      key: "weight",
      number: "①",
      leftLabel: "가벼운 향",
      rightLabel: "무게감 있는 향"
    },
    {
      key: "freshness",
      number: "②",
      leftLabel: "상큼함",
      rightLabel: "포근함"
    },
    {
      key: "sweetness",
      number: "③",
      leftLabel: "깨끗함",
      rightLabel: "달콤함"
    },
    {
      key: "warmth",
      number: "④",
      leftLabel: "시원함",
      rightLabel: "따뜻함"
    },
    {
      key: "maturity",
      number: "⑤",
      leftLabel: "캐주얼함",
      rightLabel: "성숙함"
    },
    {
      key: "presence",
      number: "⑥",
      leftLabel: "은은함",
      rightLabel: "존재감 있는 향"
    }
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

    setDislikedScents((currentScents) => {

      if (item === dislikedNoneOption) {

        return currentScents.includes(dislikedNoneOption)
          ? []
          : [dislikedNoneOption];
      }

      if (currentScents.includes(dislikedNoneOption)) {
        return currentScents;
      }

      return currentScents.includes(item)
        ? currentScents.filter(
          scent => scent !== item
        )
        : [
          ...currentScents,
          item
        ];
    });
  };

  const handleSliderChange = (key, value) => {

    setSliderValues((currentValues) => ({
      ...currentValues,
      [key]: value
    }));
  };

  const canSubmit =
    preferredScents.length > 0 &&
    dislikedScents.length > 0 &&
    usageOccasion !== "";

  const handleSubmit = () => {

    if (!canSubmit) {
      return;
    }

    const requestData = {

      requestId: `recommend-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`,

      sliderValues,

      preferredScents,

      dislikedScents: dislikedScents.includes(dislikedNoneOption)
        ? []
        : dislikedScents,

      usageOccasion
    };

    console.log(requestData);

    navigate("/result-loading", {
      state: requestData
    });
  };

  return (

    <div className="preference-page">

        <div className="preference-top-bg"></div>

        <div className="preference-bottom-bg"></div>

      <div className="preference-overlay">

        {/* 헤더 */}

        <div className="preference-header">

          <button
            className="preference-back-btn"
            onClick={() => navigate("/", { replace: true })}
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

          {
            sliderOptions.map((slider) => {

              const value = sliderValues[slider.key];

              return (

                <div
                  className="preference-slider-item"
                  key={slider.key}
                >

                  <span className="preference-slider-number">
                    {slider.number}
                  </span>

                  <div className="preference-slider-control">

                    <span
                      className="preference-slider-percent"
                      style={{
                        left:
                          `clamp(20px, ${value}%, calc(100% - 20px))`
                      }}
                    >
                      {value}%/{100 - value}%
                    </span>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      aria-label={slider.leftLabel}
                      onChange={(e) =>
                        handleSliderChange(
                          slider.key,
                          Number(e.target.value)
                        )
                      }
                    />

                  </div>

                  <div className="preference-slider-labels">

                    <span>{slider.leftLabel}</span>

                    <span>{slider.rightLabel}</span>

                  </div>

                </div>
              );
            })
          }

        </div>

        {/* 02 */}

        <div className="preference-section-title">
          02. 좋아하는 향 계열 (복수 선택)
        </div>

        <div className="preference-grid preference-preferred-grid">

          {
            preferredOptions.map(
              (item) => (

                <button
                  key={item.title}
                  className={
                    preferredScents.includes(item.title)
                      ? "preference-option-btn selected"
                      : "preference-option-btn"
                  }
                  onClick={() =>
                    handlePreferredClick(item.title)
                  }
                >

                  <span className="preference-option-title">
                    {item.title}
                  </span>

                  <span className="preference-option-desc">
                    {item.description}
                  </span>

                </button>
              )
            )
          }

        </div>

        {/* 03 */}

        <div className="preference-section-title">
          03. 싫어하는 향 계열 (복수 선택)
        </div>

        <div className="preference-grid preference-disliked-grid">

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
                  disabled={
                    dislikedScents.includes(dislikedNoneOption) &&
                    item !== dislikedNoneOption
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

        <div className="preference-grid preference-occasion-grid">

          {
            occasionOptions.map(
              (item) => (

                <button
                  key={item.label}
                  className={
                    usageOccasion === item.label
                      ? "preference-option-btn selected"
                      : "preference-option-btn"
                  }
                  onClick={() =>
                    setUsageOccasion(item.label)
                  }
                >

                  <img
                    className="preference-occasion-icon"
                    src={item.image}
                    alt=""
                  />

                  <span className="preference-occasion-label">
                    {item.label}
                  </span>

                </button>
              )
            )
          }

        </div>

        <button
          className="preference-submit-btn"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >

          ✦ 내 취향 좌표 확인하기

        </button>

      </div>

    </div>
  );
}

export default PreferenceTest;
