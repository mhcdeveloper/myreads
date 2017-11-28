import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';

import ListBooks from './components/ListBooks';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };

    this.updateShelf = this.updateShelf.bind(this); 
  }

  //Metodo responsável por setar o shelf do book retornado da api na state shelf do select
  componentWillMount() {
    this.getAllBooks();
  }

  //Metodo responsável por buscar todos os books na api
  getAllBooks = () => {
    this.setState({ loading: true });
    BooksAPI.getAll().then((books) => {
      this.setState({ books, loading: false });
    });
  }

  //Metodo responsável por setar os books no localStorage
  updateLocalStorage = (books) => {
    window.localStorage.setItem('myReadsBooks', JSON.stringify(books));
  }

  //Metodo responsável por atualizar o shelf do book
  //O retorno do metodo update é um conjunto de array, porem dei um setState com o spread dos arrays retornados
  updateShelf = (book, shelf) => {
    this.setState({ loading: true });
    BooksAPI.update(book, shelf).then((books) => {
      this.getAllBooks();
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/" render={() => (
          <ListBooks 
            books={this.state.books} 
            updateShelf={this.updateShelf}
            loading={this.state.loading} 
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;
