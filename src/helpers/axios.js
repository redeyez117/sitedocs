import axios from "axios";

const API = axios.create({
    baseURL: 'https://dev-api-1.sitedocs.com/api/v1/workers',
    headers: {Authorization: 'Token 44798935-c223-47e6-b0eb-84df6c6210c7'}
  });

  export default API