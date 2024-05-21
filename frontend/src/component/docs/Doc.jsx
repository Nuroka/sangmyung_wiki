import ReactHtmlParser from "react-html-parser";

export default function Doc({ doc }) {
  return (
    <div>
      <h2>{doc.title}</h2>
      <br />
      <div>{ReactHtmlParser(doc.content)}</div>
    </div>
  );
}
