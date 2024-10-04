import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("token");


const request = async (method, endpoint, data = null) => {
  try {
    const res = await axios({
      method,
      url: `${url}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    return res.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};
//api request
const get = async (endpoint) => {
  return await request('GET', endpoint);
};

const post = async (endpoint, body) => {
  return await request('POST', endpoint, body);
};

const put = async (endpoint, body) => {
  return await request('PUT', endpoint, body);
};

const del = async (endpoint) => {
  return await request('DELETE', endpoint);
};

const apiService = {
  get,
  post,
  put,
  delete: del, 
};

export default apiService;
// import axios from 'axios';

// const url = import.meta.env.VITE_BASE_URL;

// const token = localStorage.getItem("token");

// const request = (method, endpoint, data = null) => {
//   return axios({
//     method,
//     url: `${url}/${endpoint}`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     data,
//   })
//   .then(res => res.data)
//   .catch(error => {
//     console.error(`Error in ${method} request to ${endpoint}:`, error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || 'Something went wrong');
//   });
// };

// // API request
// const get = (endpoint) => {
//   return request('GET', endpoint);
// };

// const post = (endpoint, body) => {
//   return request('POST', endpoint, body);
// };

// const put = (endpoint, body) => {
//   return request('PUT', endpoint, body);
// };

// const del = (endpoint) => {
//   return request('DELETE', endpoint);
// };

// const apiService = {
//   get,
//   post,
//   put,
//   delete: del,
// };

// export default apiService;
