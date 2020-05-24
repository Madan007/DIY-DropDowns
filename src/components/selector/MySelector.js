import * as React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { Example } from './Example';
import * as Films from './films';
const FilmSelect = Select.ofType();
export default class MySelector extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      film: Films.TOP_100_FILMS[0],
    };
    this.handleValueChange = (film) => this.setState({ film });
  }
  render() {
    const buttonText = this.state.film.title;
    return React.createElement(
      Example,
      { header: 'Select Dropdown' },
      React.createElement(
        FilmSelect,
        {
          items: Films.TOP_100_FILMS,
          itemPredicate: Films.filterFilm,
          itemRenderer: Films.renderFilm,
          noResults: React.createElement(MenuItem, {
            disabled: true,
            text: 'No results.',
          }),
          onItemSelect: this.handleValueChange,
        },
        React.createElement(Button, {
          text: buttonText,
          rightIcon: 'caret-down',
        })
      )
    );
  }
}
