import { useQuery } from "@tanstack/react-query";

import { defaultInstance } from "../util/api";

export default function Recent() {
  const url = "/recent";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/recent"],
    queryFn: async () => {
      try {
        const response = await defaultInstance.get(url);
        console.log(response.data);
        return response.data;
      } catch (error) {
        // error handling
      }
    },
    staleTime: 1000,
    keepPreviousData: true,
  });

  return (
    <>
      <p>최근 변경</p>
      {isLoading ? (
        <p>로딩 중..</p>
      ) : (
        <>
          {isError && <p>{error.message}</p>}
          {
            <ul>
              {data.map((recent, index) => (
                <li key={index}>{recent}</li>
              ))}
            </ul>
          }
        </>
      )}
    </>
  );
}
