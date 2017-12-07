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
            .then((books) => this.verificarPrateleira(books) );
    }

    //Devido eu utilizar o GraphQl eu tive que apenas acrescentar um atributo shelf nos books que foram
    //verificado na prateleira já existente, porque os id dos books retornados da BookApi são diferentes
    //dos meus retornados do GraphQl
    verificarPrateleira = (books) => {
        for(const bookFilter of this.props.books) {
            books.filter(book => book.title === bookFilter.title)
                .map(book => {
                    //Removo o book existente
                    books.splice(book, 1);
                    
                    //Acrescento o atributo shelf com valor do book da prateleira e troco 
                    //O id com o do servidor GraphQl pra fazer update caso ocorra
                    let imageLinks = {smallThumbnail: book.imageLinks.smallThumbnail};
                    let graphQlBook = { 
                        id: bookFilter.id,
                        shelf: bookFilter.shelf,
                        authors: book.authors[0], 
                        description: book.description, 
                        imageLinks: imageLinks, 
                        title: book.title, 
                    };
                    //Adiciono o book novo com os campos atualizado shelf e id
                    books.push(graphQlBook);
                    console.log(graphQlBook);
                    this.setState({ books });
                });   
        }
    }

    //Metodo responsavel por limpar a query do filtro
    clearQuery = () => {
        this.setState({ query: '' });
    }

    //Metodo responsável por inserir o novo book no GraphQl
    verificarBook= (book, shelf) => {
        const bookSelected = {
            authors: book.authors[0],
            description: book.description, 
            imageLinks: book.imageLinks.smallThumbnail, 
            title: book.title,
            shelf: shelf
        };             
        this.props.createBook(bookSelected);
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        createBook: PropTypes.func.isRequired
    }

    render() {
        const { shelf, updateShelf } = this.props;
        const { books, query, open, title} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            value={query} 
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                    <Link to='/create' className='add-contact'>Add Contact</Link>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(book => 
                            <li key={book.id}>
                                <BookSearch 
                                    book={book} 
                                    updateShelf={updateShelf} 
                                    createBook={this.verificarBook}
                                    shelf={shelf} 
                                />
                            </li>
                        )}
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