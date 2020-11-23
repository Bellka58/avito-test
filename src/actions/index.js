import {
  NEWS_IDS_LIST_REQUEST,
  NEWS_IDS_LIST_SUCCESS,
  NEWS_IDS_LIST_FAILURE,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAILURE,
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  COMMENTS_LIST_FAILURE,
  CLEAR_CURRENT_NEWS_ITEM,
  CURRENT_NEWS_ITEM_SUCCESS,
  CURRENT_NEWS_ITEM_REQUEST,
  CURRENT_NEWS_ITEM_FAILURE,
} from '../constants/actions';
import { newsListApi, itemApi } from '../api';

export function newsIdsListRequest() {
  return {
    type: NEWS_IDS_LIST_REQUEST,
  };
}

export function newsIdsListSuccess(data) {
  return {
    type: NEWS_IDS_LIST_SUCCESS,
    payload: data,
  };
}

export function newsIdsListFailure(error) {
  return {
    type: NEWS_IDS_LIST_FAILURE,
    payload: error,
  };
}

export function newsListRequest() {
  return {
    type: NEWS_LIST_REQUEST,
  };
}

export function newsListSuccess(data) {
  return {
    type: NEWS_LIST_SUCCESS,
    payload: data,
  };
}

export function newsListFailure(error) {
  return {
    type: NEWS_LIST_FAILURE,
    payload: error,
  };
}

export function commentsListRequest() {
  return {
    type: COMMENTS_LIST_REQUEST,
  };
}

export function commentsListSuccess(data) {
  return {
    type: COMMENTS_LIST_SUCCESS,
    payload: data,
  };
}

export function commentsListFailure(error) {
  return {
    type: COMMENTS_LIST_FAILURE,
    payload: error,
  };
}

export function clearCurrentNewsItem() {
  return {
    type: CLEAR_CURRENT_NEWS_ITEM,
  };
}

export function currentNewsItemRequest() {
  return {
    type: CURRENT_NEWS_ITEM_REQUEST,
  };
}

export function currentNewsItemSuccess(data) {
  return {
    type: CURRENT_NEWS_ITEM_SUCCESS,
    payload: data,
  };
}

export function currentNewsItemFailure(err) {
  return {
    type: CURRENT_NEWS_ITEM_FAILURE,
    payload: err,
  };
}

function getNewsListItems(data) {
  return (dispatch) => {
    dispatch(newsListRequest());
    Promise.all(data.map((id) => itemApi(id)))
      .then((res) => dispatch(newsListSuccess(res.map(({ data }) => data))))
      .catch((err) => dispatch(newsListFailure(err)));
  };
}

export function getNewsList() {
  return (dispatch) => {
    dispatch(newsIdsListRequest());
    newsListApi()
      .then(({ data }) => {
        const newData = data.slice(0, 100);
        dispatch(newsIdsListSuccess(newData));
        dispatch(getNewsListItems(newData));
      })
      .catch((err) => {
        dispatch(newsIdsListFailure(err));
      });
  };
}

export function getCommentsList(commentsIds) {
  return (dispatch) => {
    dispatch(commentsListRequest());
    Promise.all(commentsIds.map((id) => itemApi(id)))
      .then((res) => {
        dispatch(
          commentsListSuccess(
            res
              .map(({ data }) => data)
              .filter(({ deleted, dead }) => !deleted && !dead)
          )
        );
      })
      .catch((err) => dispatch(commentsListFailure(err)));
  };
}

export function getCurrentNewsItem(id) {
  return (dispatch) => {
    dispatch(currentNewsItemRequest());
    return itemApi(id).then(({ data }) =>
      dispatch(currentNewsItemSuccess(data))
    );
  };
}

export function getNewsItemWithComments(id) {
  return (dispatch) => {
    dispatch(currentNewsItemRequest());
    itemApi(id).then(({ data }) => {
      dispatch(currentNewsItemSuccess(data));
      if (data.kids && data.kids.length) {
        dispatch(getCommentsList(data.kids));
      }
    });
  };
}
