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
  CLEAR_COMMENTS_LIST,
} from '../constants/actions';

const initialState = {
  newsIds: [],
  news: [],
  currentNews: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_IDS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEWS_IDS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        newsIds: action.payload,
      };
    case NEWS_IDS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case NEWS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEWS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload,
      };
    case NEWS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CURRENT_NEWS_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CURRENT_NEWS_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        currentNews: {
          ...state.currentNews,
          ...action.payload,
        },
      };
    case COMMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        currentNews: { ...state.currentNews, comments: action.payload },
      };
    case CLEAR_COMMENTS_LIST:
      return {
        ...state,
        currentNews: null,
      };
    default:
      return state;
  }
};

export default reducer;
