import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { authInstance } from "../../util/api";
import UpdatePwForm from "./UpdatePwForm";
import { useNavigate } from "react-router-dom";

/**
 * todo validation
 */

export default function FindIdDetail() {
  const url = "/member/update";

  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    new_password: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => {
      console.log(data);
      // const response = authInstance.post(url, data);
      // Http Status Error handling
      // return response;
    },
    onSuccess: () => {
      navigate("/mypage");
    },
  });

  function handleSubmit(formData) {
    const newData = {
      password: formData.password,
      new_password: formData.new_password,
    };
    setData(newData);
    mutate(newData);
  }

  return (
    <>
      <h2>계정 찾기</h2>
      {isError && <p>{error.message}</p>}
      <UpdatePwForm onSubmit={handleSubmit} inputData={data}>
        <button type="submit" className="button" disabled={isPending}>
          {isPending ? "전송 중..." : "변경"}
        </button>
      </UpdatePwForm>
    </>
  );
}
