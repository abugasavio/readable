import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Layout from './Layout';

const NotFoundPage = () => (
    <Layout>
      <Segment massive raised>
        <Header>404</Header>
        <Header>Page Not Found</Header>
      </Segment>
    </Layout>
  );

export default NotFoundPage;
