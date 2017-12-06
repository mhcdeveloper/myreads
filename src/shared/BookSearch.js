import React, { Component } from 'react';

class BookSearch extends Component {
    constructor(props) {
        super(props);

        this.state = ({ shelf: '' });

        this.handleChange = this.handleChange.bind(this);        
    }

    //Metodo responsável por atualizar o shelf inicial de para none
    componentWillMount() {
        this.setState({ shelf: 'none' });
    }
    
    //Metodo responsável por atualizar o book e seu respectivo shelf selecionado no menu.
    handleChange(event) {
        const shelf = event.target.value;
        //Caso o shelf selecionado seja none ele chama o metodo deleteBook
        if(shelf !== 'none') {
            this.props.createBook(this.props.book);
            this.setState({ shelf });            
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
                                <option value="none" disabled>Move to...</option>
                                <option value="wantToRead">Want To Read</option>
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