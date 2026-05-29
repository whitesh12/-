import { useState } from "react";

import "../styles/translate.css";

import backArrow from "../assets/back-arrow.png";

import searchIcon from "../assets/search.svg";

import sendIcon from "../assets/send.svg";

// mock 데이터 import
import { mockPerfumeData }
from "../mock/mockData";

function Translate() {

  // 검색어 저장
  const [keyword, setKeyword] = useState("");

  // 결과 저장
  const [result, setResult] = useState(null);

  // 검색 여부
  const [isSearched, setIsSearched] =
    useState(false);

  // 검색 버튼 클릭
  const handleSearch = async () => {

    // 공백 제거
    const trimmedKeyword =
      keyword.trim();

    // 빈값 검색 방지
    if (!trimmedKeyword) {

      setResult(null);

      setIsSearched(false);

      return;
    }

    setIsSearched(true);

    try {

      // -------------------
      // 백엔드 연결 시 사용
      // -------------------

      /*
      const response = await fetch(
        `백엔드주소?keyword=${trimmedKeyword}`
      );

      const data = await response.json();

      setResult(data);
      */

      // 임시로 강제 에러 발생
      throw new Error();

    } catch (error) {

      // -------------------
      // mock 데이터 검색
      // -------------------

      const foundData =
        mockPerfumeData.find((item) => {

          return (

            item.term
              .toLowerCase()
              .includes(
                trimmedKeyword.toLowerCase()
              )

            ||

            item.english
              .toLowerCase()
              .includes(
                trimmedKeyword.toLowerCase()
              )
          );
        });

      // 검색 성공
      if (foundData) {

        setResult(foundData);

      } else {

        // 검색 실패
        setResult(null);
      }
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

            // 엔터 검색
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                handleSearch();
              }
            }}
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

            <>

              {/* 카테고리 */}

              <div className="category-title">

                #
                {" "}
                {result.category}

              </div>

              {/* 결과 카드 */}

              <div className="result-card">

                <h2>

                  {result.term}

                  {" / "}

                  {result.english}

                </h2>

                <p>
                  {result.description}
                </p>

              </div>

            </>
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