import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';

import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  //Metodo responsável por atualizar o shelf do book
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.setState((state) => ({ ...books }));
      console.log(this.state.books);
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/" render={() => (
          <ListBooks books={this.state.books} updateShelf={this.updateShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
