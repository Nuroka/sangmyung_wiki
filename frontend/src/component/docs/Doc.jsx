import parse from "html-react-parser";

export default function Doc({ doc }) {
  return (
    <div>
      <h2>{doc.title}</h2>
      <br />
      <div>{parse(doc.content)}</div>
    </div>
  );
}
