import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

export const ErrorIndicator = () => (
  <Container textAlign="center">
    <Icon name="warning" color="red" />
    <Header as="span" color="red">
      Something gone wrong
    </Header>
  </Container>
);
