import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../img/search.png";
import { ReactComponent as SuggestionIcon } from "../../img/suggestion.svg";
import styles from "./Search.module.css";

import { defaultInstance } from "../../util/api";
import useDebounce from "../../util/useDebounce";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300); // 300ms debouncing
  const dropdownRef = useRef(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [debouncedQuery],
    queryFn: async () => {
      let url = "/docs/search?keyword=" + debouncedQuery;
      const response = await defaultInstance.get(url);
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        return { data: [] };
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
    setDropdownVisible(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        placeholder="이곳에서 검색"
        value={query}
        onChange={handleInputChange}
        onClick={() => {
          setDropdownVisible(true);
        }}
      />
      <img className={styles.searchIcon} src={searchIcon} alt="search" />
      {isDropdownVisible && (
        <div className={styles.suggestions} ref={dropdownRef}>
          {(!debouncedQuery || isError || data?.length === 0) && (
            <div
              className={styles.suggestion}
              onClick={() => {
                setDropdownVisible(false);
              }}
            >
              검색결과 없음
            </div>
          )}
          {data?.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestion}
              onClick={() => {
                setDropdownVisible(false);
                navigate("/docs/" + suggestion.id);
              }}
            >
              <SuggestionIcon />
              {suggestion.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
