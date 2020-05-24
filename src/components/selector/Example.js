import * as React from 'react';
import { Card } from '@blueprintjs/core';
export class Example extends React.PureComponent {
  render() {
    return React.createElement(
      Card,
      { className: 'example-card' },
      React.createElement('h3', null, this.props.header),
      this.props.children
    );
  }
}
