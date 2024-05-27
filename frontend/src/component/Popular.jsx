import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from "../util/api";
import styles from "./Popular.module.css";

export default function Popular() {
  const url = "/board/popular";

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await defaultInstance.get(url);
      return response.data;
    },
    retry: 1,
    refetchInterval: 1 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

  return (
    <>
      <p className={styles.popularTitle}>인기글</p>
      {isError ? (
        <>
          <p>{error.message}</p>
          <p>서버 연결 상태를 확인해주세요.</p>
        </>
      ) : !data ? (
        <p>로딩 중..</p>
      ) : (
        <>
          {
            <ul className={styles.recent}>
              {data.slice(0, 8).map((popular, index) => (
                <li
                  key={index}
                  className={styles.recentItem}
                  onClick={() => {
                    navigate("/board/one?id=" + popular.board_id);
                  }}
                >
                  {popular.board_title.length > 15
                    ? `${popular.board_title.slice(0, 15)}...`
                    : popular.board_title}
                </li>
              ))}
            </ul>
          }
        </>
      )}
    </>
  );
}
