import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultInstance } from "../../util/api";
import styles from "../docs/RecentEditedLog.module.css";

const DocsLog = () => {
  let url = "/docs/log";

  const initialDocsLogData = [
    {
      id: 1,
      date: "2024-02-22",
      time: "19:28:14",
      changes: "r003",
      editor: "User3",
    },
    {
      id: 2,
      date: "2024-02-21",
      time: "14:25:14",
      changes: "r002",
      editor: "User2",
    },
    {
      id: 3,
      date: "2024-02-19",
      time: "12:25:13",
      changes: "r001",
      editor: "User1",
    },
  ];

  const [docsLogData, setDocsLogData] = useState(initialDocsLogData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const goToPrevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextPage = () => {
    if (currentIndex < docsLogData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToDocument = (id) => {
    navigate(`/document/${id}`);
  };

  const fetchData = async () => {
    try {
      const response = await defaultInstance.get(url);
      setDocsLogData(response.data);
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <div>
      <h1 className={styles.recentTitle}>문서 역사</h1>
      <div>
        <button className={styles.whiteBtn} onClick={goToPrevPage}>
          {"< Prev"}
        </button>
        <button className={styles.whiteBtn} onClick={goToNextPage}>
          {"Next >"}
        </button>
      </div>
      <div>
        {initialDocsLogData.map((log, index) => (
          <p key={index}>
            &bull; {log.date} {log.time} (
            <span onClick={() => goToDocument(log.id)}>보기</span> | ){" "}
            {log.changes} {log.editor}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DocsLog;
