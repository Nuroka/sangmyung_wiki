import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { defaultInstance } from "../../util/api";
import { useNavigate } from "react-router";

/**
 * todo validation
 * Http Status Error handling
 */
export default function FindIdForm() {
  const url = "/findID";

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => {
      const response = defaultInstance.post(url, data);
      // Http Status Error handling
      return response;
    },
    onSuccess: () => {
      navigate("/findID/auth", { state: { email: data.email } });
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setData(data);
    mutate(data);
  }

  return (
    <>
      <h2>계정 찾기</h2>
      {isError && <p>{error.message}</p>}
      <form id="form" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">이메일</label>
          <input type="text" id="email" name="email" defaultValue={data?.email} disabled={isPending} />
        </p>
        <button type="submit" className="button" disabled={isPending}>
          {isPending ? "전송 중..." : "찾기"}
        </button>
      </form>
    </>
  );
}
