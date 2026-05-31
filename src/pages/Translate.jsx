import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/translate.css";

// 아이콘 및 에셋 import
import backArrow from "../assets/back-arrow.png";
import searchIcon from "../assets/search.svg";
import sendIcon from "../assets/send.svg";

import { searchScentTerms } from "../api/scents";
import { mockPerfumeData } from "../mock/mockData";
import { termImages, defaultImages } from "../data/termImages";

const imageAliases = {
  우디: "woody",
  woody: "woody",
  플로럴: "floral",
  floral: "floral",
  시트러스: "citrus",
  citrus: "citrus",
  머스크: "musk",
  musk: "musk",
  앰버: "amber",
  amber: "amber",
  파우더리: "powdery",
  powdery: "powdery",
  아쿠아틱: "aquatic",
  aquatic: "aquatic",
  그린: "green",
  green: "green",
  스파이시: "spicy",
  spicy: "spicy",
  로즈: "rose",
  rose: "rose",
  자스민: "jasmine",
  jasmine: "jasmine",
  네롤리: "neroli",
  neroli: "neroli",
  베르가못: "bergamot",
  bergamot: "bergamot",
  레몬: "lemon",
  lemon: "lemon",
  자몽: "grapefruit",
  grapefruit: "grapefruit",
  유자: "yuza",
  yuzu: "yuza",
  샌달우드: "sandalwood",
  샌들우드: "sandalwood",
  sandalwood: "sandalwood",
  시더우드: "cedarwood",
  cedarwood: "cedarwood",
  베티버: "vetiver",
  vetiver: "vetiver",
  패출리: "patchouli",
  patchouli: "patchouli",
  바닐라: "vanilla",
  vanilla: "vanilla",
  통카빈: "tonkbean",
  "tonka bean": "tonkbean",
  소피: "soapy",
  soapy: "soapy",
  클린: "clean",
  clean: "clean",
  "탑 노트": "topnote",
  "top note": "topnote",
  "미들 노트": "middlenote",
  "middle note": "middlenote",
  "베이스 노트": "basenote",
  "base note": "basenote",
  향조: "accord",
  accord: "accord",
  잔향: "drydown",
  "dry down": "drydown",
  지속력: "longevity",
  longevity: "longevity",
  발향력: "projection",
  projection: "projection",
  실라지: "sillage",
  sillage: "sillage",
  "오 드 퍼퓸": "edp",
  "eau de parfum": "edp",
  "오 드 뚜왈렛": "edt",
  "eau de toilette": "edt",
  퍼퓸: "parfum",
  parfum: "parfum"
};

const largeImages = [
  "musk",
  "sandalwood",
  "vetiver",
  "patchouli",
  "tonkbean"
];

function normalizeKey(value = "") {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function findImageKey(item) {
  const matchedMock = mockPerfumeData.find((mockItem) => {
    return (
      normalizeKey(mockItem.term) === normalizeKey(item.term) ||
      normalizeKey(mockItem.english) === normalizeKey(item.english)
    );
  });

  return (
    item.image ||
    matchedMock?.image ||
    imageAliases[normalizeKey(item.term)] ||
    imageAliases[normalizeKey(item.english)]
  );
}

function Translate() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchRequestKey, setSearchRequestKey] = useState(0);

  useEffect(() => {
    const trimmedKeyword = keyword.trim();

    // 최소 두 글자 이상일 때만 검색 시작
    if (trimmedKeyword.length < 2) {
      setResults([]);
      setIsSearched(false);
      setIsLoading(false);
      setSearchError("");
      return;
    }

    setIsSearched(true);
    setIsLoading(true);
    setSearchError("");

    const controller = new AbortController();

    const loadResults = async () => {
      try {
        const foundData = await searchScentTerms(
          trimmedKeyword,
          controller.signal
        );

        const mappedResults = foundData.map((item) => {
          const imageKey = findImageKey(item);
          const hasSpecificImage = !!termImages[imageKey];
          const isLargeTarget = largeImages.includes(imageKey);

          return {
            ...item,
            imageSrc:
              termImages[imageKey] ||
              defaultImages[item.id % defaultImages.length],
            isLarge: isLargeTarget || !hasSpecificImage
          };
        });

        setResults(mappedResults);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.warn(error);
          setResults([]);
          setSearchError("검색 연결에 문제가 있어요. 잠시 후 다시 시도해주세요.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadResults();

    return () => controller.abort();
  }, [keyword, searchRequestKey]);

  const handleSearchSubmit = () => {
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword.length < 2) {
      setResults([]);
      setIsSearched(false);
      setIsLoading(false);
      setSearchError("두 글자 이상 입력해주세요.");
      return;
    }

    setSearchRequestKey((currentKey) => currentKey + 1);
  };

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <button
            className="search-btn"
            type="button"
            onClick={handleSearchSubmit}
          >
            <img
              src={sendIcon}
              alt="보내기"
              className="send-icon-img"
            />
          </button>
        </div>

        <div className="results-container">
          {isLoading ? (
            <div className="empty-card">
              검색 중...
            </div>
          ) : results.length > 0 ? (
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
          ) : searchError ? (
            <div className="empty-card">
              {searchError}
            </div>
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
