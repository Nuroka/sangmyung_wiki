import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import searchIcon from "../../img/search.png";
import styles from "./Search.module.css";

import { defaultInstance } from "../../util/api";
import useDebounce from "../../util/useDebounce";
import { useNavigate } from "react-router-dom";

/**
 * todo
 * 문서 이름으로 드롭다운 이름 변경 필요
 * CSS 적용 필요(모양, 드롭다운 꺼짐)
 */
export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500); // 500ms 디바운싱 적용

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [debouncedQuery],
    queryFn: async () => {
      let url = "/docs/search?keyword=" + debouncedQuery;
      const response = await defaultInstance.get(url);
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        return { docsIdList: [] };
      } else {
        throw new Error();
      }
    },
    retry: 0,
    staleTime: 1 * 60 * 1000,
    enabled: debouncedQuery.length > 0,
    keepPreviousData: true,
  });

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        placeholder="이곳에서 검색"
        value={query}
        onChange={handleInputChange}
      />
      <img className={styles.searchIcon} src={searchIcon} alt="search" />
      {debouncedQuery && (
        <div className={styles.suggestions}>
          {/* {isLoading && <div>Loading...</div>} */}
          {isError && <div className={styles.suggestion}>검색결과 없음</div>}
          {data?.docsIdList?.length === 0 && (
            <div className={styles.suggestion}>검색결과 없음</div>
          )}
          {data?.docsIdList?.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestion}
              onClick={() => {
                navigate("/doc", {
                  state: { id: suggestion },
                });
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
