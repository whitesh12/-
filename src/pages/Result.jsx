import { useLocation, useNavigate } from "react-router-dom";

import "../styles/result.css";

import { DEFAULT_RECOMMENDATION } from "../api/recommendation";
import goTranslate from "../assets/go_translate.png";
import homeIcon from "../assets/home.png";

const tagSearchAliases = {
  aldehyde: "Aldehydic",
  aldehydes: "Aldehydic"
};

function getTagSearchKeyword(tag) {

  const keyword = String(tag || "")
    .replace(/^#?(Top|Middle|Base)\s*:\s*/i, "")
    .split("/")
    .map((value) => value.trim())
    .filter(Boolean)[0] || "";

  return tagSearchAliases[keyword.toLowerCase()] ||
    keyword;
}

function Result() {

  const navigate = useNavigate();

  const location = useLocation();

  const recommendation =
    location.state?.recommendation ||
    DEFAULT_RECOMMENDATION;

  const isFallbackRecommendation =
    recommendation.isFallback !== false;
  const summary =
    isFallbackRecommendation
      ? DEFAULT_RECOMMENDATION.summary
      : recommendation.summary;
  const tags =
    !isFallbackRecommendation &&
    Array.isArray(recommendation.tags) &&
    recommendation.tags.length > 0
      ? recommendation.tags
      : DEFAULT_RECOMMENDATION.tags;

  return (

    <div className="result-page">

      <div className="result-bg-top"></div>
      <div className="result-bg-bottom"></div>

      <div className="result-page-content">

        <div className="result-top-buttons">

          <button
            className="result-icon-btn"
            onClick={() => navigate("/", { replace: true })}
            aria-label="메인화면으로 이동"
          >
            <img
              src={homeIcon}
              alt=""
            />
          </button>

          <button
            className="result-icon-btn"
            onClick={() => navigate(
              "/translate",
              {
                state: {
                  fromResult: true,
                  resultState: location.state || {
                    recommendation
                  }
                }
              }
            )}
            aria-label="향수어 번역기로 이동"
          >
            <img
              src={goTranslate}
              alt=""
            />
          </button>

        </div>

        <h1 className="result-title">
          당신의 향수 좌표를 찾았습니다!
        </h1>

        <section className="result-perfume-card">

          <p className="result-brand">
            {recommendation.brand}
          </p>

          <h2>
            {recommendation.name}
          </h2>

          <p className="result-summary">
            {summary}
          </p>

          <p className="result-description">
            {recommendation.description}
          </p>

          <p className="result-reason">
            {recommendation.reason}
          </p>

          <div className="result-tags">

            {
              tags.map((tag) => {

                const searchKeyword =
                  getTagSearchKeyword(tag);

                return (

                <button
                  key={tag}
                  type="button"
                  onClick={() => navigate(
                    "/translate",
                    {
                      state: {
                        keyword: searchKeyword,
                        fromResult: true,
                        resultState: location.state || {
                          recommendation
                        }
                      }
                    }
                  )}
                  disabled={!searchKeyword}
                >
                  {tag}
                </button>
                );
              })
            }

          </div>

        </section>

        <button
          className="result-retry-btn"
          onClick={() => navigate("/preference-test")}
        >
          테스트 다시 하기 ↻
        </button>

      </div>

    </div>
  );
}

export default Result;
