import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Button, Comment, Container, Header, Icon } from 'semantic-ui-react';

import { clearCommentsList, getNewsItemWithComments } from '../actions';
import { MAIN_PAGE } from '../constants/paths';
import { getFormattedTime } from '../utils/time';
import CommentsListItem from './comments-list-item';
import { ParagraphLoader } from './shared/paragraph-loader';

const NewsItem = ({
  news,
  currentNews,
  loading,
  clearCommentsList,
  getNewsItemWithComments,
}) => {
  const { id } = useParams();
  const newsItem = currentNews || news.find((item) => item.id === +id);
  const { title, by, url, time, descendants } = newsItem || {};
  const { comments } = currentNews || {};

  const hasComments = !!comments && !!comments.length;
  const loader =
    !!descendants && !hasComments && loading ? <ParagraphLoader /> : null;

  useEffect(() => {
    getNewsItemWithComments(id);
    const interval = setInterval(() => {
      getNewsItemWithComments(id);
    }, 60000);

    return () => {
      clearCommentsList();
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
      <Button
        primary
        disabled={loading}
        loading={loading}
        onClick={handleUpdate}
      >
        Update
      </Button>
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
  clearCommentsList: () => dispatch(clearCommentsList()),
  getNewsItemWithComments: (id) => dispatch(getNewsItemWithComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);