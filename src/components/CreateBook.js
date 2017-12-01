import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize';

class CreateBook extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        if (this.props.addBook) {
            this.props.addBook(values);
        }
    }
    render() {
        return (
            <div>
                <Link className='close-create-book' to='/'>Close</Link>
                <form onSubmit={this.handleSubmit} className='create-book-form'>
                    <div className='create-book-details'>
                        <input type='text' name='title' placeholder='Title'/>
                        <input type='text' name='description' placeholder='Description'/>
                        <input type='text' name='categories' placeholder='Categories'/>
                        <input type='text' name='imageLinks' placeholder='Image Link'/>
                        <input type='text' name='shelf' placeholder='Shelf'/>
                        <input type='text' name='authors' placeholder='Authors'/>
                        <button>Add book</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateBook;
