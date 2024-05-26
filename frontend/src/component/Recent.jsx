import { useQuery } from "@tanstack/react-query";
import { authInstance } from "../util/api";
import styles from "../component/Recent.module.css";
import { useNavigate } from "react-router-dom";

export default function Recent() {
  const url = "/docs/edit";

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await authInstance.get(url);
      return response.data;
    },
    retry: 1,
    refetchInterval: 1 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

  return (
    <>
      <p className={styles.recentTitle}>최근 변경</p>
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
              {data.slice(0, 8).map((recent, index) => (
                <li
                  key={index}
                  className={styles.recentItem}
                  onClick={() => {
                    navigate("/doc", {
                      state: { id: recent.documents.id },
                    });
                  }}
                >
                  {recent.documents.title.length > 15
                    ? `${recent.documents.title.slice(0, 15)}...`
                    : recent.documents.title}
                </li>
              ))}
            </ul>
          }
        </>
      )}
    </>
  );
}
