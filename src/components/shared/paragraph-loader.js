import React from 'react';
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

export const ParagraphLoader = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
    <Image src="/images/short-paragraph.png" />
  </Segment>
);
