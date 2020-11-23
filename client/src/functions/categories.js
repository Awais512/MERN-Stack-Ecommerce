import axios from 'axios';

//Get All Categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/category`);

//Get Category By Id
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

//Remove Categories
export const removeCategory = async (slug, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.delete(
    `${process.env.REACT_APP_API}/category/${slug}`,
    config
  );
};

//Update Categories
export const updateCategory = async (slug, category, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    category,
    config
  );
};

//Create Categories
export const createCategory = async (category, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.post(
    `${process.env.REACT_APP_API}/category`,
    category,
    config
  );
};

//Get All subCategories of category
export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
