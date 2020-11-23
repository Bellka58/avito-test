import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Container } from 'semantic-ui-react';

import { NEWS_PAGE } from '../constants/paths';
import { getNewsList } from '../actions';
import { ParagraphLoader } from './shared';
import NewsListItem from './news-list-item';

const NewsList = ({ news, getNewsList, loading }) => {
  useEffect(() => {
    getNewsList();

    const interval = setInterval(() => {
      getNewsList();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleUpdate = () => {
    getNewsList();
  };

  const history = useHistory();

  const handleRoute = (id) => {
    history.push(`${NEWS_PAGE + '/' + id}`);
  };

  const loader =
    (!news || !news.length) && loading ? <ParagraphLoader /> : null;

  return (
    <Container>
      <h1>News List</h1>
      <Button
        primary
        disabled={loading}
        loading={loading}
        onClick={handleUpdate}
      >
        Update
      </Button>
      {loader}
      {!!news &&
        !!news.length &&
        news.map(({ id, title, by, score, time }) => (
          <NewsListItem
            key={id}
            handleRoute={() => handleRoute(id)}
            title={title}
            by={by}
            score={score}
            time={time}
          />
        ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getNewsList: () => dispatch(getNewsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
