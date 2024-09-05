import parse from "html-react-parser";
import { useLocation } from "react-router-dom";

export default function LogDetail() {
  const { state } = useLocation();
  return (
    <>
      <h2>이전 문서</h2>
      <br />
      <hr />
      <br />
      {parse(state)}
    </>
  );
}
