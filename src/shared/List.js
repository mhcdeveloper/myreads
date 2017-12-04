import React from 'react';

import Book from './Book';

const List = ({ books, updateShelf, deleteBook, shelf }) => (
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
export default List;