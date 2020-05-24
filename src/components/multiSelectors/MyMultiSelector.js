import * as React from 'react';
import { Button, Intent, MenuItem, Switch } from '@blueprintjs/core';
// import { Example } from '@blueprintjs/docs-theme';
import { Example } from './Example';
import { MultiSelect } from '@blueprintjs/select';
import {
  areFilmsEqual,
  arrayContainsFilm,
  createFilm,
  filmSelectProps,
  maybeAddCreatedFilmToArrays,
  maybeDeleteCreatedFilmFromArrays,
  renderCreateFilmOption,
  TOP_100_FILMS,
} from './films';
const FilmMultiSelect = MultiSelect.ofType();
const INTENTS = [
  Intent.NONE,
  Intent.PRIMARY,
  Intent.SUCCESS,
  Intent.DANGER,
  Intent.WARNING,
];
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
      items: filmSelectProps.items,
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
      return React.createElement(MenuItem, {
        active: modifiers.active,
        icon: this.isFilmSelected(film) ? 'tick' : 'blank',
        key: film.rank,
        label: film.year.toString(),
        onClick: handleClick,
        text: `${film.rank}. ${film.title}`,
        shouldDismissPopover: false,
      });
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
    const initialContent = this.state.hasInitialContent
      ? React.createElement(MenuItem, {
          disabled: true,
          text: `${TOP_100_FILMS.length} items loaded.`,
        }) // explicit undefined (not null) for default behavior (show full list)
      : undefined;
    const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
    const maybeCreateNewItemRenderer = allowCreate
      ? renderCreateFilmOption
      : null;
    const clearButton =
      films.length > 0
        ? React.createElement(Button, {
            icon: 'cross',
            minimal: true,
            onClick: this.handleClear,
          })
        : undefined;
    return React.createElement(
      Example,
      Object.assign({}, this.props),
      React.createElement(
        FilmMultiSelect,
        Object.assign({}, filmSelectProps, {
          createNewItemFromQuery: maybeCreateNewItemFromQuery,
          createNewItemRenderer: maybeCreateNewItemRenderer,
          initialContent: initialContent,
          itemRenderer: this.renderFilm,
          itemsEqual: areFilmsEqual,
          // we may customize the default filmSelectProps.items by
          // adding newly created items to the list, so pass our own
          items: this.state.items,
          noResults: React.createElement(MenuItem, {
            disabled: true,
            text: 'No results.',
          }),
          onItemSelect: this.handleFilmSelect,
          onItemsPaste: this.handleFilmsPaste,
          popoverProps: { minimal: popoverMinimal },
          tagRenderer: this.renderTag,
          tagInputProps: {
            onRemove: this.handleTagRemove,
            rightElement: clearButton,
          },
          selectedItems: this.state.films,
        })
      )
    );
  }
}
