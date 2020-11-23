import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { getFormattedTime } from '../utils/time';

const NewsListItem = ({ title, by, score, time, handleRoute }) => {
  return (
    <Card onClick={handleRoute} fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          <Icon disabled name="heart" />
          {score}
        </Card.Description>
        <Card.Content>
          <Icon disabled name="user" />
          {by}
        </Card.Content>
        <Card.Description>{getFormattedTime(time)}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default NewsListItem;
