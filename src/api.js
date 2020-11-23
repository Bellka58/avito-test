import axios from 'axios';

const api = () => {
  return axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/',
  });
};

export function newsListApi() {
  return api().get('newstories.json');
}

export function itemApi(id) {
  return api().get(`item/${id}.json`);
}
