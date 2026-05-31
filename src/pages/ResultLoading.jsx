import {
  useEffect,
  useState
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchRecommendation } from "../api/recommendation";

import "../styles/resultLoading.css";

const recommendationCache = new Map();
const recommendationRequests = new Map();

function ResultLoading() {

  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {

    let isMounted = true;

    const loadRecommendation = async () => {

      const preferenceData = location.state;

      if (!preferenceData) {
        setErrorMessage("테스트 정보를 다시 선택해주세요.");
        return;
      }

      const requestKey = preferenceData.requestId ||
        JSON.stringify(preferenceData);
      const cachedRecommendation =
        recommendationCache.get(requestKey);

      if (cachedRecommendation) {
        navigate("/result", {
          replace: true,
          state: {
            preferenceData,
            recommendation: cachedRecommendation
          }
        });
        return;
      }

      try {

        const request =
          recommendationRequests.get(requestKey) ||
          fetchRecommendation(preferenceData);

        recommendationRequests.set(requestKey, request);

        const recommendation = await request;

        if (!isMounted) {
          return;
        }

        recommendationCache.set(requestKey, recommendation);
        recommendationRequests.delete(requestKey);

        navigate("/result", {
          replace: true,
          state: {
            preferenceData,
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

        recommendationRequests.delete(requestKey);
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
