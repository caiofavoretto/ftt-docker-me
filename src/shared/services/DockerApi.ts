import axios from 'axios';

const dockerApi = axios.create({
  baseURL: process.env.DOCKER_API_URL,
});

export default dockerApi;
