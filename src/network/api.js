import axios from 'axios';

const baseURL = 'http://api.hackerwebapp.com/';

const fetchStories = (storyType, page = null) =>
  axios(`${baseURL}${storyType}?page=${page}`);

const hnApi = {
  fetchStories
};
export default hnApi;
