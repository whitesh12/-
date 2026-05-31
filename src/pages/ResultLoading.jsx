import {
  useEffect,
  useState
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchRecommendation } from "../api/recommendation";

import "../styles/resultLoading.css";

function ResultLoading() {

  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {

    let isMounted = true;

    const loadRecommendation = async () => {

      if (!location.state) {
        setErrorMessage("테스트 정보를 다시 선택해주세요.");
        return;
      }

      try {

        const recommendation = await fetchRecommendation(location.state);

        if (!isMounted) {
          return;
        }
        navigate("/result", {
          replace: true,
          state: {
            preferenceData: location.state,
            recommendation
          }
        });

      } catch (error) {

        console.warn(error);

        if (isMounted) {
          setErrorMessage(
            error.status === 429
              ? "오늘 AI 추천 가능 횟수를 모두 사용했어요.\n잠시 후 다시 시도해주세요."
              : "AI 추천 가능 횟수를 모두 사용했거나 연결이 불안정해요.\n잠시 후 다시 시도해주세요."
          );
          return;
        }
      }
    };

    loadRecommendation();

    return () => {
      isMounted = false;
    };

  }, [location.state, navigate]);

  return (

    <div className="result-loading-page">

      <div className="result-loading-content">

        <p className="result-loading-main-text">
          당신의 취향에 맞는 향수를 찾고 있어요.
        </p>

        <p className="result-loading-sub-text">
          {errorMessage || "✦ Scent Orbit AI Matching..."}
        </p>

      </div>

    </div>
  );
}

export default ResultLoading;
