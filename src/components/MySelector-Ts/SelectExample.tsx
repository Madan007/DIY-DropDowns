import * as React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

import { Example } from './Example';
import * as Films from './films';

const FilmSelect = Select.ofType<Films.Film>();

interface SelectExampleState {
  film: Films.Film;
}

export class SelectExample extends React.PureComponent<{}, SelectExampleState> {
  public state: SelectExampleState = {
    film: Films.TOP_100_FILMS[0],
  };

  public render() {
    const buttonText = this.state.film.title;
    return (
      <Example header="Select Sandbox">
        <FilmSelect
          items={Films.TOP_100_FILMS}
          itemPredicate={Films.filterFilm}
          itemRenderer={Films.renderFilm}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleValueChange}
        >
          <Button text={buttonText} rightIcon="caret-down" />
        </FilmSelect>
      </Example>
    );
  }

  private handleValueChange = (film: Films.Film) => this.setState({ film });
}
