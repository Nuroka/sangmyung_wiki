import { useEffect, useState } from "react";

import { defaultInstance } from "../util/api";

export default function Popular() {
  const [data, setData] = useState([]);

  useEffect(() => {
    function fetchPopular() {
      const url = "/popular";
      defaultInstance
        .get(url)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchPopular();
  }, []);

  return (
    <>
      <p>인기글</p>
      <div>
        {data && (
          <ul>
            {data.map((popular) => (
              <li key={popular}>{popular}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
