import React, { useState } from 'react';
import { Comment, Icon } from 'semantic-ui-react';

import { itemApi } from '../api';
import { getFormattedTime } from '../utils/time';
import { ParagraphLoader } from './shared/paragraph-loader';

const CommentsListItem = ({ author, time, text, kids }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const hasComments = !!comments && !!comments.length;
  const hasKids = !!kids && !!kids.length;

  const handleUpload = () => {
    if (hasComments) {
      setComments(null);
    } else {
      setIsLoading(true);
      Promise.all(kids.map((id) => itemApi(id)))
        .then((res) => {
          setIsLoading(false);
          setComments(
            res.map(({ data }) => data).filter(({ deleted }) => !deleted)
          );
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as="span">{author}</Comment.Author>
        <Comment.Metadata>
          <div>{getFormattedTime(time)}</div>
        </Comment.Metadata>
        <Comment.Text>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Comment.Text>
        {hasKids && (
          <>
            <Comment.Actions>
              <Comment.Action onClick={handleUpload}>
                More
                <Icon
                  flipped={hasComments ? 'vertically' : null}
                  name="caret down"
                />
              </Comment.Action>
            </Comment.Actions>
            {(hasComments || isLoading) && (
              <Comment.Group>
                {hasComments &&
                  comments.map(({ id, by, time, text, kids }) => (
                    <CommentsListItem
                      key={id}
                      author={by}
                      time={time}
                      text={text}
                      kids={kids}
                    />
                  ))}
                {isLoading && <ParagraphLoader />}
              </Comment.Group>
            )}
          </>
        )}
      </Comment.Content>
    </Comment>
  );
};

export default CommentsListItem;
