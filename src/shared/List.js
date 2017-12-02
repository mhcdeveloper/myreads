import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class List extends Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired,
        deleteBook: PropTypes.func.isRequired
    }

    render() {
        const { books, updateShelf, deleteBook, shelf } = this.props;
        return (
            <div>
                {shelf.map(shelf => (
                    <div className="bookshelf" key={shelf}>
                        <h2 className="bookshelf-title">{shelf}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter(book => book.shelf.toLowerCase() === {shelf}.shelf.replace( /\s/g, '' ).toLowerCase())
                                    .map((book) =>
                                        <li key={book.id}>
                                            <Book 
                                                book={book} 
                                                updateShelf={updateShelf}
                                                deleteBook={deleteBook} 
                                            />
                                        </li>
                                    )}
                            </ol>
                        </div>
                    </div> 
                ))}
            </div>
        )
    }
}

export default List;