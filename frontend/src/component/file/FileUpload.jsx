import React from "react";
import UploadForm from "./UploadForm";
// 파일 업로드 컴포넌트


export default function FileUpload() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("file",files[0]);
    
    const value=[{
      file_name: "",
      license: "",
      category: "",
      summary: ""
    }]
    const blob = new Blob([JSON.stringify(value)], {type: "application/json"})
    formData.append("data",blob);

    try {
      const response = await fetch("/file", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        mode: "cors",
        data: formData,
      });
      const data = await response.json();

      // 결과를 출력하거나 상태를 업데이트하는 코드를 추가
      console.log(data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>파일 업로드 및 정보 입력</title>
        <style>
          {`
                        label {
                            display: block;
                            margin-bottom: 10px;
                        }
                    `}
        </style>
      </head>
      <body>
        <h2>파일 올리기</h2>
        <UploadForm onSubmit={handleSubmit} />
        <div id="output"></div>
      </body>
    </html>
  );
}