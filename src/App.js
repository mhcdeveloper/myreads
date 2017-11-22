import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';

import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    currentlyBooks: [],
    wantBooks: [],
    readBooks: []
  }

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      console.log(this.state.books);
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/" render={() => (
          <ListBooks books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
