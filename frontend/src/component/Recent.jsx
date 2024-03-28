import { useQuery } from "@tanstack/react-query";

import { fetchRecent } from "../util/recentAPI";

export default function Recent() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/recent"],
    queryFn: () => fetchRecent(),
    staleTime: 30000,
    keepPreviousData: true,
  });

  let content;

  if (isLoading) {
    content = <p>Loading..</p>;
  }

  if (isError) {
    content = <p>{error}</p>;
  }

  if (data) {
    content = (
      <ul>
        {data.map((recent) => (
          <li key={recent}>{recent}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <p>최근 변경</p>
      {content}
    </>
  );
}
