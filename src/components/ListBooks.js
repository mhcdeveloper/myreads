import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

import List from '../shared/List';

class ListBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    //Metodo responsável por renderizar o loading ou a lista de books
    renderLoader = (loading, updateShelf, deleteBook) => {
        const { books, shelf } = this.props;
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
                    <List 
                        books={books} 
                        updateShelf={updateShelf} 
                        deleteBook={deleteBook}
                        shelf={shelf} 
                    />
                </div>
            );
        }
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired,
        deleteBook: PropTypes.func.isRequired
    }
    
    render() {
        const { updateShelf, loading, deleteBook } = this.props; 
        return (
            <div className="list-books">
                <div className="list-books-content">
                    {this.renderLoader(loading, updateShelf, deleteBook)}               
                </div>
                
                <div className="open-search">
                    <Link to="/search">Search a book</Link>
                </div>
            </div>  
        )
    }
}

export default ListBooks;