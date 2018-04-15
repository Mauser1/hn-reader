import firebase from "firebase";

const API_BASE_URL = "https://hacker-news.firebaseio.com";
const API_VERS = "/v0";
const config = { databaseURL: API_BASE_URL };
firebase.initializeApp(config);

const api = firebase.database().ref(API_VERS);

function fetchItem(id, cb) {
  itemRef(id).once("value", snapshot => {
    cb(snapshot.val());
  });
}

function fetchItems(ids, cb) {
  const items = [];
  ids.forEach(id => {
    fetchItem(id, addItem);
  });
  function addItem(item) {
    items.push(item);
    if (items.length >= ids.length) {
      cb(items);
    }
  }
}

function storiesRef(path) {
  return api.child(path);
}

function itemRef(id) {
  return api.child(`item/${id}`);
}

const hnApi = {
  fetchItem,
  fetchItems,
  storiesRef,
  itemRef
};
export default hnApi;
