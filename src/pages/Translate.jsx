import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/translate.css";

// 아이콘 및 에셋 import
import backArrow from "../assets/back-arrow.png";
import searchIcon from "../assets/search.svg";
import sendIcon from "../assets/send.svg";

// 목데이터 및 이미지 맵핑 파일 import
import { mockPerfumeData } from "../mock/mockData";
import { termImages, defaultImages } from "../data/termImages";

function Translate() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const trimmedKeyword = keyword.trim();

    // 최소 두 글자 이상일 때만 검색 시작
    if (trimmedKeyword.length < 2) {
      setResults([]);
      setIsSearched(false);
      return;
    }

    setIsSearched(true);

    const foundData = mockPerfumeData.filter((item) => {
      return (
        item.term.toLowerCase().includes(trimmedKeyword.toLowerCase()) ||
        item.english.toLowerCase().includes(trimmedKeyword.toLowerCase())
      );
    });

    const mappedResults = foundData.map((item) => {
      const hasSpecificImage = !!termImages[item.image];
      
      // 크게 보일 이미지 리스트
      const largeImages = ["musk", "sandalwood", "vetiver", "patchouli", "tonkbean"];
      const isLargeTarget = largeImages.includes(item.image);
      
      return {
        ...item,
        imageSrc:
          termImages[item.image] ||
          defaultImages[item.id % defaultImages.length],
        isLarge: isLargeTarget || !hasSpecificImage // 지정된 5종 혹은 디폴트 이미지인 경우 true
      };
    });

    setResults(mappedResults);
  }, [keyword]);

  return (
    <div className="translate-page">
      <div className="translate-overlay">
        <div className="translate-header">
          <button className="back-btn" onClick={() => navigate("/")}>
            <img src={backArrow} alt="뒤로가기" />
          </button>
          <div className="header-text">
            <h1>향수어 번역기</h1>
            <p>어려운 향수 용어를 일상적인 말로 바꿔드려요.</p>
          </div>
        </div>

        <div className="search-box">
          <img
            src={searchIcon}
            alt="검색"
            className="search-icon-img"
          />
          <input
            type="text"
            placeholder="두 글자 이상 입력해보세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="search-btn">
            <img
              src={sendIcon}
              alt="보내기"
              className="send-icon-img"
            />
          </button>
        </div>

        <div className="results-container">
          {results.length > 0 ? (
            results.map((item, index) => {
              // 이전 항목과 카테고리가 다를 때만 헤더 출력
              const showCategory = index === 0 || results[index - 1].category !== item.category;
              
              return (
                <div key={item.id} className="result-wrapper">
                  {showCategory && <div className="category-title"># {item.category}</div>}
                  <div className="result-card">
                    <div className="result-top">
                      <img
                        src={item.imageSrc}
                        alt={item.term}
                        className={`result-image ${item.isLarge ? "large" : ""}`}
                      />
                      <div className="result-content">
                        <h2>
                          {item.term} / {item.english}
                        </h2>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            isSearched && (
              <div className="empty-card">
                해당 용어가 검색되지 않습니다.
                <br />
                다른 단어로 검색해보세요!
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Translate;