import { useState, useEffect } from "react";

import { parseFileName } from "../../util/parse";
import styles from "./UserFile.module.css";

export default function UserFile({ fileList }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [data, setData] = useState(fileList);

  useEffect(() => {
    setData(fileList);
  }, [fileList]);

  const handleCopy = (file, index) => {
    navigator.clipboard.writeText(file).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.th}>
          <tr>
            <th className={`${styles.title} ${styles.nameColumn}`}>내 파일</th>
            <th className={`${styles.title} ${styles.copyColumn}`}></th>
          </tr>
        </thead>
        {data.length === 0 && (
          <p>
            <br />
            등록한 파일이 없습니다.
          </p>
        )}
        {data.length > 0 && (
          <tbody>
            {data.map((file, index) => (
              <tr key={index} className={styles.tb}>
                <td>&bull; {parseFileName(file)}</td>
                <td className={styles.td}>
                  <button className={styles.copyBtn} onClick={() => handleCopy(file, index)}>
                    {copiedIndex === index ? "복사완료" : "복사"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}
