import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import PropTypes from 'prop-types';

import List from '../shared/List';

class SearchBook extends Component {
    constructor(props) {
        super(props);

        this.state = ({ query: '' });
    }
    
    //Metodo responsavel por atualizar a query do filtro
    updateQuery = (query) => {
        this.setState({ query: query.trim() });
    }

    //Metodo responsavel por limpar a query do filtro
    clearQuery = () => {
        this.setState({ query: '' });
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired,
        deleteBook: PropTypes.func.isRequired
    }

    render() {
        const { books, updateShelf, deleteBook, shelf } = this.props;
        const { query } = this.state;
        
        let showingBooks;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingBooks = books.filter((book) => match.test(book.authors));
        } else {
            showingBooks = books;
        }
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                    <Link to='/create' className='add-contact'>Add Contact</Link>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    </ol>
                </div>
                <div>
                    <List 
                        books={showingBooks} 
                        updateShelf={updateShelf}
                        deleteBook={deleteBook}
                        shelf={shelf}
                    />
                </div>
            </div>
        )
    }
}
export default SearchBook;