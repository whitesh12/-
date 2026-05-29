import { useState } from "react";
import "../styles/translate.css";

// 아이콘 및 에셋 import
import backArrow from "../assets/back-arrow.png";
import searchIcon from "../assets/search.svg";
import sendIcon from "../assets/send.svg";

// 목데이터 및 이미지 맵핑 파일 import
import { mockPerfumeData } from "../mock/mockData";
import { termImages, defaultImages } from "../data/termImages";

function Translate() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setResult(null);
      setIsSearched(false);
      return;
    }

    setIsSearched(true);

    try {
      /*
      const response = await fetch(
        `백엔드주소?keyword=${trimmedKeyword}`
      );

      const data = await response.json();

      setResult(data);
      */

      throw new Error();

    } catch (error) {

      const foundData = mockPerfumeData.find((item) => {

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

      if (foundData) {

        console.log(foundData);

        console.log(
          "mapped =",
          termImages[
            foundData.image
          ]
        );

        setResult({

          ...foundData,

          imageSrc:

            termImages[
              foundData.image
            ]

            ||

            defaultImages[
              foundData.id %
              defaultImages.length
            ]
        });

      } else {

        setResult(null);
      }
    }
  };

  return (
    <div className="translate-page">

      <div className="translate-overlay">

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

        <div className="search-box">

          <img
            src={searchIcon}
            alt="검색"
            className="search-icon-img"
          />

          <input
            type="text"

            placeholder=
              "궁금한 향수 용어를 입력해보세요."

            value={keyword}

            onChange={(e) =>
              setKeyword(e.target.value)
            }

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                handleSearch();
              }
            }}
          />

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

        {result && (

          <>

            <div className="category-title">

              #
              {" "}
              {result.category}

            </div>

            <div className="result-card">

              <div className="result-top">

                <img
                  src={result.imageSrc}
                  alt={result.term}
                  className="result-image"
                />

                <div className="result-content">

                  <h2>

                    {result.term}

                    {" / "}

                    {result.english}

                  </h2>

                  <p>
                    {result.description}
                  </p>

                </div>

              </div>

            </div>

          </>

        )}

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