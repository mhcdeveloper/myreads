import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from '../BooksAPI';
import BookSearch from '../shared/BookSearch';
import DialogSuccess from '../shared/DialogSuccess';

class SearchBook extends Component {
    constructor(props) {
        super(props);

        this.state = ({ 
            query: '',
            books: [],
            open: false,
            title: ''
        });
    }
    
    componentWillReceiveProps() {
        if(this.props.open === true) {
            this.setState({ 
                open: true, 
                title: this.props.title 
            });
        }
    }

    //Metodo responsavel por atualizar a query do filtro
    updateQuery = (query) => {
        this.setState({ query });
        this.searchBook(query, 10);
    }

    //Metodo responsável por buscar o book no bookApi
    searchBook = (query, maxResults) => {
        BooksAPI.search(query, maxResults)
            .then((books) => this.setState({ books }));
    }

    //Metodo responsavel por limpar a query do filtro
    clearQuery = () => {
        this.setState({ query: '' });
    }

    //Metodo responsável por verificar se o book selecioando existem na prateleira caso não exista
    //ele inseri no servidor graphQl na prateleira
    verificarBook= (book) => {
        const books = this.props.books;
        let bookExistente = ''
        for(const bookFilter of books) {
            if(bookFilter.title === book.title) {
                bookExistente = book;
            }
        }
        
        if(bookExistente) {
            this.setState({ 
                open: true, 
                title: 'Há um livro com esse titulo na prateleira',
            });
        } else {
            let categories = '';
            if(book.categories[0] === null) {
                categories = 'Sem categoria';
            } else {
                categories = book.categories[0];
            }
            const bookSelected = {
                authors: book.authors[0],
                categories: categories, 
                description: book.description, 
                imageLinks: book.imageLinks.smallThumbnail, 
                title: book.title,
                shelf: 'wantToRead'
            };             
            this.props.createBook(bookSelected);
        }
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        createBook: PropTypes.func.isRequired
    }

    render() {
        const { books, query, open, title} = this.state;
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
            {this.state.open}
                    <ol className="books-grid">
                        { books.map(book => {
                            return (
                                <BookSearch
                                    key={book.id} 
                                    book={book}
                                    createBook={this.verificarBook} />
                            )
                        }) }
                    </ol>
                </div>
                <div>
                    <DialogSuccess 
                        open={open} 
                        title={title}
                    />
                </div>
            </div>
        )
    }
}
export default SearchBook;