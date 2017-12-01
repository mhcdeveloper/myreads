import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { Route, Link } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

import Book from '../shared/Book';
import SearchBook from './SearchBook';

class ListBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shelf: [
                "Currently Reading",
                "Want To Read",
                "Read"
            ],
            query: ''
        }
    }

    //Metodo responsavel por atualizar a query do filtro
    updateQuery = (query) => {
        this.setState({ query: query.trim() });
    }

    //Metodo responsavel por limpar a query do filtro
    clearQuery = () => {
        this.setState({ query: '' });
    }

    //Metodo responsável por renderizar o loading ou a lista de books
    renderLoader = (loading, showingBooks, updateShelf) => {
        if (loading) {
            return (
                <div className="loading">
                    <CircularProgress
                        size={100}
                        thickness={20} 
                    />
                </div>
            );
        } else {
            return (
                <div>
                    {this.state.shelf.map(shelf => (
                        <div className="bookshelf" key={shelf}>
                            <h2 className="bookshelf-title">{shelf}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks.filter(book => book.shelf.toLowerCase() === {shelf}.shelf.replace( /\s/g, '' ).toLowerCase())
                                        .map((book) =>
                                            <li key={book.id}>
                                                <Book book={book} updateShelf={updateShelf} />
                                            </li>
                                        )}
                                </ol>
                            </div>
                        </div> 
                    ))}
                </div>
            );
        }
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }
    
    render() {
        const { books, updateShelf, loading } = this.props; 
        const { query } = this.state;

        let showingBooks;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingBooks = books.filter((book) => match.test(book.authors));
        } else {
            showingBooks = books;
        }

        return (
            <div className="list-books">
                <div className="search-books">
                    <Route path="/search" render={() => (
                        <SearchBook query={query} updateQuery={this.updateQuery} />
                    )} />
                </div>
                <div className="list-books-content">
                    {this.renderLoader(loading, showingBooks, updateShelf)}               
                </div>
                <div className="open-search">
                  <Link to="/create">Add a book</Link>
                </div>
            </div>  
        )
    }
}

export default ListBooks;