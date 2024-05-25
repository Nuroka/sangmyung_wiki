import { useState } from "react";

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function DocsEditForm({ onSubmit, detail, edit }) {
  const [doc, setDoc] = useState({
    title: detail ? detail.title : "",
    content: detail ? detail.content : "",
  });

  const handleChange = (event) => {
    setDoc({
      ...doc,
      [event.target.id]: event.target.value,
    });
  };

  function handleSubmit() {
    console.log({ ...doc });
    onSubmit({ ...doc });
  }

  return (
    <div>
      <div>
        <style>
          {`
          .ck.ck-editor {
            max-width: 95%;
          }
          .ck-editor__editable {
            min-height: 300px;
          }
          .root {
            --ck-z-default: 100;
            --ck-z-panel: calc( var(--ck-z-default) + 999 );
        }
        `}
        </style>
        <input
          id="title"
          type="text"
          placeholder="title"
          value={doc.title}
          onChange={handleChange}
          disabled={edit}
        />
        <hr />
        <CKEditor
          editor={Editor}
          data={doc.content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDoc({
              ...doc,
              content: data,
            });
          }}
        />
      </div>
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
}
