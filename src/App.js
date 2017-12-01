import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ListBooks from './components/ListBooks';
import CreateBook from './components/CreateBook';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loading: true,
      fields: {},
      openDialog: false
    };

    this.updateShelf = this.updateShelf.bind(this); 
  }

  //Metodo responsável por receber os books retornado do GraphQl
  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;
    this.setState({ 
      books: data.allBooks,
      loading: false 
    }, () => {
      this.updateLocalStorage(data.allBooks);   
    });
  }

  //Metodo responsável por setar os books no localStorage
  updateLocalStorage = (books) => {
    window.localStorage.setItem('myReadsBooks', JSON.stringify(books));
  }
  
  //Metodo responsável por criar um novo Book 
  addBook = (data) => {
    this.props.createBook({
      variables: {
        ...data
      },
      refetchQueries: [
        { query: Query }
      ]
    }).then(res => {
      this.setState({
        loading: false,
        openDialog: true
      })
    }).catch(err => {
      console.log(err);
    })

  }
  
  //Metodo responsável por atualizar o shelf do book
  updateShelf = (book, shelf) => {
    this.setState({ loading: true });
    this.props.updateBook({
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
  }

  //Metodo responsável por atualizar as mudanças nos campos do formulário
  onChange = (updatedValue) => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  }

  render() {
    const { books, loading, openDialog } = this.state;
    return (
      <MuiThemeProvider>
        <div className="app">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path="/" render={() => (
            <ListBooks 
              books={books} 
              updateShelf={this.updateShelf}
              loading={loading} 
            />
          )} />
          <Route  path="/create" render={() => (
            <CreateBook 
              addBook={this.addBook} 
              onChange={fields => this.onChange(fields)}
              openDialog={openDialog}
              loading={loading}
            />
          )} />
        </div>
      </MuiThemeProvider>
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
const UpdateBookMutation = gql`
mutation updateBook ($id: ID!, $shelf: String) {
  updateBook(id: $id, shelf: $shelf) {
    id
    shelf
  }
}
`
const CreateBookMutation = gql`
mutation createBook(
            $authors: String!, 
            $categories: String!, 
            $description: String!, 
            $imageLinks: String!, 
            $shelf: String, 
            $title: String) {
  createBook(
    authors: $authors, 
    categories: $categories, 
    description: $description, 
    imageLinks: $imageLinks, 
    shelf: $shelf, 
    title: $title) {
      id
      title
      shelf
  }
}

`
export default compose(
  graphql(Query),
  graphql(UpdateBookMutation, { name: 'updateBook' }),
  graphql(CreateBookMutation, { name: 'createBook' })
)(BooksApp);
