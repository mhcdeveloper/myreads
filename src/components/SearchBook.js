import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBook extends Component {
    render() {
        const { query, updateQuery } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => updateQuery(event.target.value)}/>
                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook;