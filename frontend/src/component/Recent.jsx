import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from "../util/api";
import styles from "../component/Recent.module.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Recent() {
  const url = "/docs/recent";

  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
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

  const listVariants = {
    hidden: { opacity: 0, x: 30, y: -20 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

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
        <ul className={styles.recent}>
          <AnimatePresence>
            {data.slice(0, 10).map((recent, index) => (
              <motion.li
                key={recent.documents.id}
                className={styles.recentItem}
                initial="hidden"
                animate="visible"
                variants={listVariants}
                layout
                transition={{
                  layout: { duration: 0.2 },
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                onClick={() => {
                  navigate("/docs/" + recent.documents.id);
                }}
              >
                {recent.documents.title.length > 15
                  ? `${recent.documents.title.slice(0, 15)}...`
                  : recent.documents.title}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}
