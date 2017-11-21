import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Book from '../shared/Book';

class ListBooks extends Component {
    state = {
        shelf: [
            "Currently Reading",
            "Want to Reading",
            "Read"
        ]
    }
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
       const { books } = this.props; 
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {this.state.shelf.map(shelf => (
                 <div className="bookshelf" key={shelf}>
                 <h2 className="bookshelf-title">{shelf}</h2>
                 <div className="bookshelf-books">
                   <ol className="books-grid">
                       {books.filter(book => book.shelf === 'currentlyReading')
                                        .map((book) => 
                                         <li key={book.id}>
                                           <Book book={book} />
                                         </li>)}
                   </ol>
                 </div>
               </div> 
              ))}
            </div>
            </div>  
        )
    }
}

export default ListBooks;