import React, { Component } from 'react';

class BookSearch extends Component {
    constructor(props) {
        super(props);

        this.state = ({ shelf: '' });

        this.handleChange = this.handleChange.bind(this);        
    }

    //Metodo responsável por atualizar o shelf inicial de para none
    componentWillMount() {
        let shelfBook = this.props.book.shelf;
        if(!shelfBook) {
            this.setState({ shelf: 'moveTo' });
        } else {
            this.setState({ shelf: shelfBook })
        }
    }
    
    //Metodo responsável por atualizar o book e seu respectivo shelf selecionado no menu.
    handleChange(event) {
        const shelf = event.target.value;
        
        //Se o shelf do book for diferente de undefined ou igual a none quer dizer que é apenas update
        //Caso contrario é um novo registro
        if(this.props.book.shelf !== undefined || this.props.book.shelf === 'none') {
            this.props.updateShelf(this.props.book, shelf);
            this.setState({ shelf });            
        } else {
            this.props.createBook(this.props.book, shelf);
        }
    }

    render() {
        const { book } = this.props;
        const { shelf } = this.state;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
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

export default BookSearch;