import * as React from 'react';
import { H3, Card } from '@blueprintjs/core';

export interface ExampleProps {
  header: string;
}

export class Example extends React.PureComponent<ExampleProps> {
  public render() {
    return (
      <Card className="example-card">
        <H3>{this.props.header}</H3>
        {this.props.children}
      </Card>
    );
  }
}
