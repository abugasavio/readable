import React from 'react'
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react'

const PageHeader = ({icon, title}) => (
  <Header as='h2'>
    <Icon name={icon} />
    <Header.Content>
      {title}
    </Header.Content>
  </Header>
)

PageHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default PageHeader
