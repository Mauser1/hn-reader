import axios from 'axios';

const baseURL = 'https://api.hackerwebapp.com';

const fetchStories = (storyType, page = null) =>
  axios(`${baseURL}/${storyType}?page=${page}`);
const fetchItem = id => axios(`${baseURL}/item/${id}`);
const hnApi = {
  fetchStories,
  fetchItem
};
export default hnApi;
