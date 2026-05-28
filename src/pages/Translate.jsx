import { useState } from "react";

import "../styles/translate.css";

import backArrow from "../assets/back-arrow.png";

import searchIcon from "../assets/search.svg";

import sendIcon from "../assets/send.svg";

function Translate() {

  // 검색어 저장
  const [keyword, setKeyword] = useState("");

  // 결과 저장
  const [result, setResult] = useState(null);

  // 검색 여부
  const [isSearched, setIsSearched] =
    useState(false);

  // 검색 버튼 클릭
  const handleSearch = () => {

    setIsSearched(true);

    // mock 데이터 테스트
    if (keyword === "우디") {

      setResult({

        korean: "우디",

        english: "Woody",

        description:
          "나무, 숲, 흙 같은 차분하고 따뜻한 향"
      });

    } else {

      setResult(null);
    }
  };

  return (

    <div className="translate-page">

      <div className="translate-overlay">

        {/* 상단 */}

        <div className="translate-header">

          <button className="back-btn">

            <img
              src={backArrow}
              alt="뒤로가기"
            />

          </button>

          <div className="header-text">

            <h1>
              향수어 번역기
            </h1>

            <p>
              어려운 향수 용어를
              일상적인 말로 바꿔드려요.
            </p>

          </div>

        </div>

        {/* 검색창 */}

        <div className="search-box">

          {/* 검색 아이콘 */}

          <img
            src={searchIcon}
            alt="검색"
            className="search-icon-img"
          />

          {/* input */}

          <input
            type="text"

            placeholder=
              "궁금한 향수 용어를 입력해보세요."

            value={keyword}

            onChange={(e) =>
              setKeyword(e.target.value)
            }
          />

          {/* 전송 버튼 */}

          <button
            className="search-btn"

            onClick={handleSearch}
          >

            <img
              src={sendIcon}
              alt="보내기"
              className="send-icon-img"
            />

          </button>

        </div>

        {/* 검색 성공 */}

        {
          result && (

            <div className="result-card">

              <h2>

                {result.korean}

                {" / "}

                {result.english}

              </h2>

              <p>
                {result.description}
              </p>

            </div>
          )
        }

        {/* 검색 실패 */}

        {
          !result && isSearched && (

            <div className="empty-card">

              해당 용어가 검색되지 않습니다.

              <br />

              다른 단어로 검색해보세요!

            </div>
          )
        }

      </div>

    </div>
  );
}

export default Translate;