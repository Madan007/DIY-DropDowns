import * as React from 'react';
import styled from 'styled-components';
export default class InputTagSelectWrapper extends React.PureComponent {
  render() {
    const CustomizedTagSelectWrapper = styled.div`
      .bp3-tag-input-values {
        .bp3-tag {
          ${this.props.tagprops || ''}
        }
        .bp3-input-ghost {
          ${this.props.searchprops || ''}
        }
      }
    `;
    return (
      <CustomizedTagSelectWrapper>
        {this.props.children}
      </CustomizedTagSelectWrapper>
    );
  }
}
