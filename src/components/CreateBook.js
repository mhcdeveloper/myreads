import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import DialogSuccess from '../shared/DialogSuccess';

class CreateBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authors: '',
            categories: '', 
            description: '', 
            imageLinks: '', 
            shelf: '', 
            title: '',
            open: false,
            loading: ''
        }
    }

    componentWillReceiveProps() {
        if(this.props.openDialog === true) {
            this.setState({
                open: true
            })
        }
    }

    //Metodo responsável por capiturar as mudanças dos valores nos campos
    changeField = (e) => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //Metodo responsável por capiturar a mudança do select field
    updateSelectField = (event, index, value) => this.setState({ shelf: value });
    
    //Metodo responsável por enviar o book para o servidor
    createBook = () => {
        if (this.props.addBook) {
            this.props.addBook(this.state);
            this.setState({ loading: true });
        }
    }
    
    //Metodo responsável por renderizar o circularProgress ou o formulario de create
    renderLoadingOrForm = () => {
        const { loading, authors, categories, description, imageLinks, shelf, title } = this.state;
        
        if(loading === true) {
            return (
                <div className="loading-create">
                    <CircularProgress
                        size={100}
                        thickness={20} 
                        />
                </div>
            )
        } else {
            return (
                <form className='create-book-form'>
                    <div className='create-book-details'>
                        <TextField
                            name="title"
                            hintText="Title"
                            floatingLabelText="Title"
                            value={title}
                            onChange={e => this.changeField(e)}
                            />
                        <br />
                        <TextField
                            name="description"
                            hintText="Description"
                            floatingLabelText="Description"
                            value={description}
                            onChange={e => this.changeField(e)}
                            multiLine={true}
                            rows={3}
                            />
                        <br />
                        <TextField
                            name="categories"
                            hintText="Categories"
                            floatingLabelText="Categories"
                            value={categories}
                            onChange={e => this.changeField(e)}
                        />
                        <br />
                        <TextField
                            name="imageLinks"
                            hintText="Image Links"
                            floatingLabelText="Image Links"
                            value={imageLinks}
                            onChange={e => this.changeField(e)}
                        />
                        <br />
                        <SelectField
                            name="shelf"
                            floatingLabelText="Shelf"
                            value={shelf}
                            onChange={this.updateSelectField}
                            >
                            <MenuItem value={'currentlyReading'} primaryText="Currently Reading" />
                            <MenuItem value={'wantToRead'} primaryText="Want to Read" />
                            <MenuItem value={'read'} primaryText="Read" />
                        </SelectField>
                        <br />
                        <TextField
                            name="authors"
                            hintText="Authors"
                            floatingLabelText="Authors"
                            value={authors}
                            onChange={e => this.changeField(e)}
                            />
                        <br />
                        <RaisedButton label="Add Book" secondary onClick={e => this.createBook()}  />
                    </div>
                </form>
            )
        }
    }
    
    render() {
        const { titleDialog } = this.props;
        const { open } = this.state;
        return (
            <div>
                <Link className='close-create-book' to='/'>Close</Link>
                <div className="labelCreate">
                    <h2>Create Book</h2>
                </div>
                <div>
                    {this.renderLoadingOrForm()}
                </div>
                <div className="loading">
                    <DialogSuccess 
                        open={open}
                        title={titleDialog} 
                    />
                </div>
            </div>
        )
    }
}

export default CreateBook;
