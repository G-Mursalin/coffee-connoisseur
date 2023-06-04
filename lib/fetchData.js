import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API,
});
// Get Images from UNSPLASH
const getCoffeeStorePhotos = async (limit) => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: limit,
  });

  return photos.response.results.map((val) => val.urls["small"]);
};

// Get Data of coffee store
export const fetchData = async (limit = 6) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API,
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?limit=${limit}`,
    options
  );
  const data = await response.json();

  const { results } = data;
  const photo = await getCoffeeStorePhotos(limit);

  return results.map((val, idx) => {
    return {
      ...val,
      imgUrl: photo[idx],
    };
  });
};
