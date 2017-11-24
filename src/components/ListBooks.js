import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { Route, Link } from 'react-router-dom';

import Book from '../shared/Book';
import SearchBook from './SearchBook';

class ListBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shelf: [
                "Currently Reading",
                "Want to Reading",
                "Read"
            ],
            query: ''
        }
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() });
        console.log(query);
    }

    clearQuery = () => {
        this.setState({ query: '' });
    }

    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        const { books } = this.props; 
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
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.state.shelf.map(shelf => (
                        <div className="bookshelf" key={shelf}>
                            <h2 className="bookshelf-title">{shelf}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks.filter((book, shelf) => book.shelf.toLowerCase() === shelf.replace( /\s/g, '' ).toLowerCase())
                                        .map((book) => 
                                            <li key={book.id}>
                                                <Book book={book} />
                                            </li>
                                        )}
                                </ol>
                            </div>
                        </div> 
                    ))}
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
            </div>  
        )
    }
}

export default ListBooks;