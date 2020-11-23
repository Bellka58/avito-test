import reducer from '../reducers';
import {
  clearCurrentNewsItem,
  commentsListRequest,
  commentsListSuccess,
  currentNewsItemFailure,
  currentNewsItemRequest,
  currentNewsItemSuccess,
  newsIdsListFailure,
  newsIdsListRequest,
  newsIdsListSuccess,
  newsListFailure,
  newsListRequest,
  newsListSuccess,
} from '../actions';

const initialState = {
  test: 'test',
  currentNews: {
    id: 353214,
    testId: 2342,
  },
};

describe('request', function () {
  const expectedResult = {
    ...initialState,
    loading: true,
    error: null,
  };

  it('newsIdsListRequest', function () {
    expect(reducer(initialState, newsIdsListRequest())).toEqual(expectedResult);
  });

  it('newsListRequest', function () {
    expect(reducer(initialState, newsListRequest())).toEqual(expectedResult);
  });

  it('currentNewsItemRequest', function () {
    expect(reducer(initialState, currentNewsItemRequest())).toEqual(
      expectedResult
    );
  });

  it('commentsListRequest', function () {
    expect(reducer(initialState, commentsListRequest())).toEqual(
      expectedResult
    );
  });
});

describe('failure', function () {
  const err = 'Failed';

  const expectedResult = {
    ...initialState,
    loading: false,
    error: err,
  };

  it('newsIdsListFailure', function () {
    expect(reducer(initialState, newsIdsListFailure(err))).toEqual(
      expectedResult
    );
  });

  it('newsListFailure', function () {
    expect(reducer(initialState, newsListFailure(err))).toEqual(expectedResult);
  });

  it('currentNewsItemFailure', function () {
    expect(reducer(initialState, currentNewsItemFailure(err))).toEqual(
      expectedResult
    );
  });
});

it('newsIdsListSuccess', function () {
  const payload = [2451, 3423];

  const expectedResult = {
    ...initialState,
    loading: false,
    newsIds: payload,
    error: null,
  };

  expect(reducer(initialState, newsIdsListSuccess(payload))).toEqual(
    expectedResult
  );
});

it('newsListSuccess', function () {
  const payload = [
    {
      by: 'rbrownsuse',
      descendants: 0,
      id: 25186484,
      score: 10,
      time: 1606137896,
      title: 'MicroOS and Kubic: New Lighter Minimum Hardware Requirements',
      type: 'story',
      url: 'https://kubic.opensuse.org/blog/2020-11-23-requirements/',
    },
    {
      by: 'bookofjoe',
      descendants: 0,
      id: 25186453,
      score: 1,
      time: 1606137707,
      title: 'Pataphysics',
      type: 'story',
      url: 'https://en.wikipedia.org/wiki/%27Pataphysics',
    },
  ];

  const expectedResult = {
    ...initialState,
    loading: false,
    news: payload,
    error: null,
  };

  expect(reducer(initialState, newsListSuccess(payload))).toEqual(
    expectedResult
  );
});

it('currentNewsItemSuccess', function () {
  const payload = {
    by: 'rbrownsuse',
    descendants: 0,
    id: 25186484,
    score: 10,
    time: 1606137896,
    title: 'MicroOS and Kubic: New Lighter Minimum Hardware Requirements',
    type: 'story',
    url: 'https://kubic.opensuse.org/blog/2020-11-23-requirements/',
  };

  const expectedResult = {
    ...initialState,
    loading: false,
    error: null,
    currentNews: { ...initialState.currentNews, ...payload },
  };

  expect(reducer(initialState, currentNewsItemSuccess(payload))).toEqual(
    expectedResult
  );
});

it('commentsListSuccess', function () {
  const payload = [
    {
      by: 'ira_bil',
      id: 25187273,
      parent: 25187272,
      text:
        'Great article that can help to make the right choice for your eCommerce business',
      time: 1606143117,
      type: 'comment',
    },
  ];

  const expectedResult = {
    ...initialState,
    loading: false,
    error: null,
    currentNews: { ...initialState.currentNews, comments: payload },
  };

  expect(reducer(initialState, commentsListSuccess(payload))).toEqual(
    expectedResult
  );
});

it('clearCurrentNewsItem', function () {
  const expectedResult = {
    ...initialState,
    currentNews: null,
  };

  expect(reducer(initialState, clearCurrentNewsItem())).toEqual(expectedResult);
});
