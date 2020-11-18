import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };

  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    config
  );
};

export const currentUser = async (authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };

  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    config
  );
};
