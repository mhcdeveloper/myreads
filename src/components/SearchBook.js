import React from 'react';
import { Link } from 'react-router-dom';

const SearchBook = ({ query, updateQuery }) => (
    <div className="search-books">
        <div className="search-books-bar">
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => updateQuery(event.target.value)}/>
            </div>
            <Link to='/create' className='add-contact'>Add Contact</Link>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
            </ol>
        </div>
    </div>
)
export default SearchBook;