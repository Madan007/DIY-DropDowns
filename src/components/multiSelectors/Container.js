import * as React from 'react';
import { Card } from '@blueprintjs/core';
export default class Container extends React.PureComponent {
  render() {
    return (
      <Card className="example-card">
        <h3>{this.props.header}</h3>
        {this.props.children}
      </Card>
    );
  }
}
