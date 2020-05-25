import * as React from 'react';
import { MenuItem } from '@blueprintjs/core';
import styled from 'styled-components';
export default class MenuItemWrapper extends React.PureComponent {
  render() {
    const CustomizeMenuItem = styled(MenuItem)`
      ${this.props.menuitemsprops || ''}
    `;
    return <CustomizeMenuItem {...this.props} />;
  }
}
