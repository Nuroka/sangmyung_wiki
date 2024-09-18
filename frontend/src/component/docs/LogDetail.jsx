import parse from "html-react-parser";
import { useLocation } from "react-router-dom";
import styles from "./Doc.module.css";

export default function LogDetail() {
  const { state } = useLocation();
  return (
    <>
      <h2>이전 문서</h2>
      <br />
      <hr />
      <br />
      <div className={styles.content}>{parse(state)}</div>
    </>
  );
}
