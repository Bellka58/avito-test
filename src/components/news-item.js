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
import { ParagraphLoader } from './shared/paragraph-loader';

const NewsItem = ({
  news,
  currentNews,
  loading,
  clearCurrentNewsItem,
  getNewsItemWithComments,
  getCommentsList,
  currentNewsItemSuccess,
}) => {
  const { id } = useParams();
  const newsItem = currentNews || news.find((item) => item.id === +id);
  const { title, by, url, time, descendants } = newsItem || {};
  const { comments } = currentNews || {};

  const hasComments = !!comments && !!comments.length;
  const loader =
    !!descendants && !hasComments && loading ? <ParagraphLoader /> : null;

  useEffect(() => {
    currentNewsItemSuccess(newsItem);
    getNewsItemWithComments(id);

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
      {!!descendants && (
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
});

const mapDispatchToProps = (dispatch) => ({
  clearCurrentNewsItem: () => dispatch(clearCurrentNewsItem()),
  getNewsItemWithComments: (id) => dispatch(getNewsItemWithComments(id)),
  getCommentsList: (id) => dispatch(getCommentsList(id)),
  currentNewsItemSuccess: (data) => dispatch(currentNewsItemSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
