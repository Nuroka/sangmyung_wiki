import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "react-router-dom";

export default function DocsDetail({ doc }) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2>
          {doc.title}
          <button
            onClick={() => {
              console.log(doc);
              navigate("/docs/edit", { state: doc });
            }}
          >
            편집
          </button>
          <button
            onClick={() => {
              navigate("/docs/log", { state: doc });
            }}
          >
            역사
          </button>
          <button
            onClick={() => {
              navigate("/docs/create");
            }}
          >
            새 문서
          </button>
        </h2>
        <hr />
        <div>{ReactHtmlParser(doc.content)}</div>
      </div>
    </>
  );
}
