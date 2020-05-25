import * as React from 'react';
import { Button } from '@blueprintjs/core';
// import { Example } from '@blueprintjs/docs-theme';
import Continer from './Container';
import InputTagSelectWrapper from './InputTagSelectWrapper';
import MenuItemWrapper from './MenuItemWrapper';
import { MultiSelect } from '@blueprintjs/select';
import {
  areFilmsEqual,
  arrayContainsFilm,
  createFilm,
  filmSelectProps,
  maybeAddCreatedFilmToArrays,
  maybeDeleteCreatedFilmFromArrays,
  renderCreateFilmOption,
} from './films';

export default class MyMultiSelector extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      allowCreate: false,
      createdItems: [],
      fill: false,
      films: [],
      hasInitialContent: false,
      intent: false,
      items: [],
      openOnKeyDown: false,
      popoverMinimal: true,
      resetOnSelect: true,
      tagMinimal: false,
    };
    this.renderTag = (film) => film.title;

    // NOTE: not using Films.itemRenderer here so we can set icons.
    this.renderFilm = (film, { modifiers, handleClick }) => {
      if (!modifiers.matchesPredicate) {
        return null;
      }

      return (
        <MenuItemWrapper
          active={modifiers.active}
          icon={this.isFilmSelected(film) ? 'tick' : 'blank'}
          key={film.rank}
          label={film.year.toString()}
          onClick={handleClick}
          text={`${film.rank}. ${film.title}`}
          shouldDismissPopover={false}
          menuitemsprops={this.props.menuitemsprops}
        ></MenuItemWrapper>
      );
    };
    this.handleTagRemove = (_tag, index) => {
      this.deselectFilm(index);
    };
    this.handleFilmSelect = (film) => {
      if (!this.isFilmSelected(film)) {
        this.selectFilm(film);
      } else {
        this.deselectFilm(this.getSelectedFilmIndex(film));
      }
    };
    this.handleFilmsPaste = (films) => {
      // On paste, don't bother with deselecting already selected values, just
      // add the new ones.
      this.selectFilms(films);
    };
    this.handleClear = () => this.setState({ films: [] });
  }

  componentDidMount() {
    this.setState({ items: filmSelectProps.items });
  }

  getSelectedFilmIndex(film) {
    return this.state.films.indexOf(film);
  }

  isFilmSelected(film) {
    return this.getSelectedFilmIndex(film) !== -1;
  }

  selectFilm(film) {
    this.selectFilms([film]);
  }

  selectFilms(filmsToSelect) {
    const { createdItems, films, items } = this.state;
    let nextCreatedItems = createdItems.slice();
    let nextFilms = films.slice();
    let nextItems = items.slice();
    filmsToSelect.forEach((film) => {
      const results = maybeAddCreatedFilmToArrays(
        nextItems,
        nextCreatedItems,
        film
      );
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create
      // Item" option will be shown even if it matches an already selected
      // item).
      nextFilms = !arrayContainsFilm(nextFilms, film)
        ? [...nextFilms, film]
        : nextFilms;
    });
    this.setState({
      createdItems: nextCreatedItems,
      films: nextFilms,
      items: nextItems,
    });
  }

  deselectFilm(index) {
    const { films } = this.state;
    const film = films[index];
    const {
      createdItems: nextCreatedItems,
      items: nextItems,
    } = maybeDeleteCreatedFilmFromArrays(
      this.state.items,
      this.state.createdItems,
      film
    );
    // Delete the item if the user manually created it.
    this.setState({
      createdItems: nextCreatedItems,
      films: films.filter((_film, i) => i !== index),
      items: nextItems,
    });
  }

  render() {
    let { allowCreate, films, popoverMinimal } = this.state;

    const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
    const maybeCreateNewItemRenderer = allowCreate
      ? renderCreateFilmOption
      : null;
    const clearButton =
      films.length > 0 ? (
        <Button icon="cross" minimal={true} onClick={this.handleClear}></Button>
      ) : undefined;
    return (
      <InputTagSelectWrapper {...Object.assign({}, this.props)}>
        <Continer {...Object.assign({}, this.props)}>
          <MultiSelect
            {...Object.assign({}, filmSelectProps, {
              createNewItemFromQuery: maybeCreateNewItemFromQuery,
              createNewItemRenderer: maybeCreateNewItemRenderer,
              initialContent: undefined,
              itemRenderer: this.renderFilm,
              itemsEqual: areFilmsEqual,
              // we may customize the default filmSelectProps.items by
              // adding newly created items to the list, so pass our own
              items: this.state.items,
              noResults: (
                <MenuItemWrapper
                  disabled={true}
                  text="No results."
                  menuitemsprops={this.props.menuitemsprops}
                />
              ),
              onItemSelect: this.handleFilmSelect,
              onItemsPaste: this.handleFilmsPaste,
              popoverProps: { minimal: popoverMinimal },
              tagRenderer: this.renderTag,
              tagInputProps: {
                onRemove: this.handleTagRemove,
                rightElement: clearButton,
              },
              selectedItems: this.state.films,
            })}
          />
        </Continer>
      </InputTagSelectWrapper>
    );
  }
}
