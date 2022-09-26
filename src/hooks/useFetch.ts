export const useFetch = async (
  URL: string,
  method: string,
  token: string,
  body: any
) => {
  const res = await fetch(URL, {
    method: method ?? "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
};
