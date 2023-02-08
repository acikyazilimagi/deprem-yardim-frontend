export const dataFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
// fetch(url)
//   .then((res) => res.json())
//   .then((res) => {
//     const transformedData = res.results ? dataTransformer(res) : [];
//     setMarkerData(transformedData);
//     return transformedData;
//   })
//   .catch((error) => {
//     console.error(error);
//     throw error;
//   });
