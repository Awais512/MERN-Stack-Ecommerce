import axios from 'axios';

//Get All SubCategories
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/sub`);

//Get SubCategory By Id
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

//Remove SubCategories
export const removeSub = async (slug, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, config);
};

//Update SubCategories
export const updateSub = async (slug, sub, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.put(
    `${process.env.REACT_APP_API}/sub/${slug}`,
    sub,
    config
  );
};

//Create SubCategories
export const createSub = async (sub, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.post(`${process.env.REACT_APP_API}/sub`, sub, config);
};
