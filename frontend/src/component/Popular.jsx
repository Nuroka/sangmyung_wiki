import { useEffect, useState } from "react";
import { defaultInstance } from "../util/api";
import styles from "../component/Popular.module.css";

export default function Popular() {
  const [data, setData] = useState([]);

  useEffect(() => {
    function fetchPopular() {
      const url = "/popular";
      defaultInstance
        .get(url)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchPopular();
  }, []);

  return (
    <>
      <p className={styles.popularTitle}>인기글</p>
      <div>
        {data && (
          <ul>
            {data.map((popular, index) => (
              <li key={index}>{popular}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
