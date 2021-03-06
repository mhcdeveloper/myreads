import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = { shelf: '' };

        this.handleChange = this.handleChange.bind(this);
    }
    
    //Seta o shelf do book no state shelf.
    componentWillMount() {
        let shelfBook = this.props.book.shelf;
        if(!shelfBook) {
            this.setState({ shelf: 'none' });
        } else {
            this.setState({ shelf: shelfBook })
        }
    }

    //Metodo responsável por atualizar o book e seu respectivo shelf selecionado no menu.
    handleChange(event) {
        const shelf = event.target.value;
        //Caso o shelf selecionado seja none ele chama o metodo deleteBook
        if(shelf === 'none') {
            this.props.deleteBook(this.props.book);
        } else {
            this.props.updateShelf(this.props.book, shelf);
            this.setState({ shelf });            
        }
    }

    render() {
        const { book } = this.props;
        const { shelf } = this.state;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks}")` }}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.handleChange}>
                                <option value="moveTo" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
          </div> 
        )
    }
}

export default Book;