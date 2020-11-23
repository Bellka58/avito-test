import {
  NEWS_IDS_LIST_REQUEST,
  NEWS_IDS_LIST_SUCCESS,
  NEWS_IDS_LIST_FAILURE,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAILURE,
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  CURRENT_NEWS_ITEM_REQUEST,
  CURRENT_NEWS_ITEM_SUCCESS,
  CURRENT_NEWS_ITEM_FAILURE,
  CLEAR_CURRENT_NEWS_ITEM,
} from '../constants/actions';

const initialState = {
  newsIds: [],
  news: [],
  currentNews: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_IDS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case NEWS_IDS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        newsIds: action.payload,
        error: null,
      };
    case NEWS_IDS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEWS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case NEWS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        news: action.payload,
      };
    case NEWS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CURRENT_NEWS_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CURRENT_NEWS_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentNews: {
          ...state.currentNews,
          ...action.payload,
        },
      };
    case COMMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentNews: { ...state.currentNews, comments: action.payload },
      };
    case CURRENT_NEWS_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_CURRENT_NEWS_ITEM:
      return {
        ...state,
        currentNews: null,
      };
    default:
      return state;
  }
};

export default reducer;
