import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Button, Comment, Container, Header, Icon } from 'semantic-ui-react';

import {
  clearCurrentNewsItem,
  currentNewsItemSuccess,
  getCommentsList,
  getNewsItemWithComments,
} from '../actions';
import { MAIN_PAGE } from '../constants/paths';
import { getFormattedTime } from '../utils/time';
import CommentsListItem from './comments-list-item';
import { ErrorIndicator, ParagraphLoader } from './shared';

const NewsItem = ({
  news,
  currentNews,
  loading,
  error,
  getCommentsList,
  clearCurrentNewsItem,
  getNewsItemWithComments,
}) => {
  const { id } = useParams();
  const newsItem =
    currentNews && +id === currentNews.id
      ? currentNews
      : news.find((item) => item.id === +id);
  const { title, by, url, time, descendants, kids } = newsItem || {};
  const { comments } = newsItem || {};

  const hasComments = !!comments && !!comments.length;
  const loader =
    !!descendants && !hasComments && loading ? <ParagraphLoader /> : null;

  const errorIndicator = error ? <ErrorIndicator /> : null;

  useEffect(() => {
    if (!currentNews || +id !== currentNews.id) {
      getNewsItemWithComments(id);
    } else if (currentNews && +id === currentNews.id && kids && kids.length) {
      getCommentsList(kids);
    }

    const interval = setInterval(() => {
      getNewsItemWithComments(id);
    }, 60000);

    return () => {
      clearCurrentNewsItem();
      clearInterval(interval);
    };
  }, []);

  const handleUpdate = () => {
    getNewsItemWithComments(id);
  };

  const history = useHistory();
  const handleRoute = () => {
    history.push(MAIN_PAGE);
  };

  if (error) {
    <ErrorIndicator />;
  }

  if (!newsItem && loading) {
    return <ParagraphLoader />;
  }

  return (
    <Container>
      <Button basic onClick={handleRoute}>
        <Icon name="long arrow alternate left" />
        Back
      </Button>
      <Header size="large">{title}</Header>
      <p>
        <a href={url} onClick={(e) => e.stopPropagation()}>
          {url}
        </a>
      </p>
      <p>{getFormattedTime(time)}</p>
      <p>
        <Icon name="user" />
        {by}
      </p>
      <p>
        <Icon name="comments" />
        {descendants}
      </p>
      {(!!descendants || hasComments) && (
        <Button
          primary
          disabled={loading}
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>
      )}
      <Comment.Group>
        {loader}
        {errorIndicator}
        {hasComments &&
          comments.map(({ id, text, kids, by, time }) => (
            <CommentsListItem
              key={id}
              author={by}
              kids={kids}
              time={time}
              text={text}
            />
          ))}
      </Comment.Group>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
  currentNews: state.currentNews,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  clearCurrentNewsItem: () => dispatch(clearCurrentNewsItem()),
  getNewsItemWithComments: (id) => dispatch(getNewsItemWithComments(id)),
  getCommentsList: (id) => dispatch(getCommentsList(id)),
  currentNewsItemSuccess: (data) => dispatch(currentNewsItemSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
