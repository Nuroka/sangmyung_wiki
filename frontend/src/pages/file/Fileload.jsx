import React from "react";
import { authInstance } from "../../util/api";
import UploadForm from "../../component/file/UploadForm";

export default function Fileload() {
  const url = "/file";

  const handleSubmit = (formData) => {
    const data = new FormData();
    data.append("file", formData.get("file"));

    const fileInfo = {
      fileName: formData.get("fileName"),
      license: formData.get("license"),
      category: formData.get("category"),
      summary: formData.get("summary"),
    };

    data.append(
      "file_info",
      new Blob([JSON.stringify(fileInfo)], {
        type: "application/json",
      })
    );

    authInstance
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("등록완료");
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        alert("업로드 실패");
        console.error(e);
      });
  };

  return (
    <>
      <UploadForm onSubmit={handleSubmit} />
    </>
  );
}
