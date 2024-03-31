import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { defaultInstance } from "../../util/api";
import FindInstruction from "./FindInstruction";
import FindIdForm from "./FindIdForm";

export default function FindIdDetail() {
  const url = "/findID"

  const [data, setData] = useState({
    email: "",
    student_Id: "",
  });
  
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => {
      const response = defaultInstance.post(url, data);
      // Http Status Error handling
      return response;
    },
    onSuccess: () => {
      setSubmitted((prev) => !prev);
    },
  });

  function handleSubmit(formData) {
    setData(formData)
    mutate(formData);
  }

  return (
    <>
      <h2>계정 찾기</h2>
      {submitted ? (
        <FindInstruction email={data.email} />
      ) : (
        <>
          {isError && <p>{error.message}</p>}
          <FindIdForm onSubmit={handleSubmit} inputData={data}>
            <button type="submit" className="button" disabled={isPending}>
              {isPending ? "전송 중..." : "찾기"}
            </button>
          </FindIdForm>  
        </>
      )}
    </>
  );
}
