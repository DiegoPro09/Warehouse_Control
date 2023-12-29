import axios from "axios"

export const baseURL = "http://127.0.0.1:8000/api"

const apiCall = axios.create({
    baseURL
})

const token = localStorage.getItem('token');

apiCall.defaults.withCredentials = true;
apiCall.defaults.headers.common['Authorization'] = `Bearer ${token}`;
apiCall.defaults.headers.post['Content-Type'] = 'application/json'
apiCall.defaults.headers.put['Content-Type'] = 'application/json'

export default apiCall

apiCall.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);