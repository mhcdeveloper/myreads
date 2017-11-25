import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = { shelf: '' };

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        const shelf = event.target.value;
        this.props.updateShelf(this.props.book, shelf);
        console.log(shelf);
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `'url("${book.imageLinks.smallThumbnail}")'` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.handleChange}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author) => (
                    <div className="book-authors" key={author}>{author}</div>
                ))}
          </div> 
        )
    }
}

export default Book;