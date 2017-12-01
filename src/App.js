import React, { Component } from 'react';
//import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ListBooks from './components/ListBooks';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loading: true
    };

    this.updateShelf = this.updateShelf.bind(this); 
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;
    this.setState({ 
      books: data.allBooks,
      loading: false 
    }, () => {
      this.updateLocalStorage(data.allBooks);   
    });
  }

  /*/Metodo responsável por setar o shelf do book retornado da api na state shelf do select
  componentWillMount() {
    this.getAllBooks();
  }

  //Metodo responsável por buscar todos os books na api caso ocorra algum error na api ele seta os books setados no localStorage
  getAllBooks = () => {
    this.setState({ loading: true });
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      this.updateLocalStorage(books);
      console.log(books);
    })
    .catch(() => {
      const bookList = window.localStorage.getItem('myReadsBooks') || '[]';
      this.setState({ books: JSON.parse(bookList) });
    });
  }
  */
  //Metodo responsável por setar os books no localStorage
  updateLocalStorage = (books) => {
    window.localStorage.setItem('myReadsBooks', JSON.stringify(books));
  }

  //Metodo responsável por atualizar o shelf do book
  //O retorno do metodo update é um conjunto de array, porem dei um setState com o spread dos arrays retornados
  updateShelf = (book, shelf) => {
    this.setState({ loading: true });
    this.props.mutate({
      variables: {
        id: book.id,
        shelf
      },
      refetchQueries: [
        {query: Query}
      ]
    }).then(res => {
      this.setState({ loading: false });
    }).catch(err => {
      console.log(err);
    })
    //this.setState({ loading: true });
    //BooksAPI.update(book, shelf).then((books) => {
    //  this.getAllBooks();
    //})
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

const Query = gql`
  query allBooks {
    allBooks {
      id
      title
      shelf
      imageLinks
      authors
    }
  }
`
const Mutation = gql`
mutation updateBook ($id: ID!, $shelf: String) {
  updateBook(id: $id, shelf: $shelf) {
    id
    shelf
  }
}
`

export default compose(
  graphql(Query),
  graphql(Mutation)
)(BooksApp);
