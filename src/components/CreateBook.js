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
            open: false
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
    change = (e) => {
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
            this.clearBook();
        }
    }

    //Metodo que limpa os fields do book
    clearBook = () => {
        this.setState({
            authors: '',
            categories: '', 
            description: '', 
            imageLinks: '', 
            shelf: '', 
            title: '',
         })
    }

    renderLoadingDialog = () => {
        console.log(this.props.openDialog);
        if(this.props.loading === true) {
            return (
                <CircularProgress
                    size={100}
                    thickness={20} 
                />
            )
        } else if(this.props.openDialog === true) {
            return (
                <DialogSuccess />
            )
        }
    } 
    
    render() {
        const { authors, categories, description, imageLinks, shelf, title, open } = this.state;
        return (
            <div>
                <Link className='close-create-book' to='/'>Close</Link>
                <form className='create-book-form'>
                    <div className='create-book-details'>
                        <TextField
                            name="title"
                            hintText="Title"
                            floatingLabelText="Title"
                            value={title}
                            onChange={e => this.change(e)}
                        />
                        <br />
                        <TextField
                            name="description"
                            hintText="Description"
                            floatingLabelText="Description"
                            value={description}
                            onChange={e => this.change(e)}
                            floatingLabelFixed
                            multiLine={true}
                            rows={3}
                        />
                        <br />
                        <TextField
                            name="categories"
                            hintText="Categories"
                            floatingLabelText="Categories"
                            value={categories}
                            onChange={e => this.change(e)}
                            floatingLabelFixed
                        />
                        <br />
                        <TextField
                            name="imageLinks"
                            hintText="Image Links"
                            floatingLabelText="Image Links"
                            value={imageLinks}
                            onChange={e => this.change(e)}
                            floatingLabelFixed
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
                            onChange={e => this.change(e)}
                            floatingLabelFixed
                        />
                        <br />
                        <RaisedButton label="Add Book" primary onClick={e => this.createBook()}  />
                    </div>
                </form>
                <div className="loading">
                    <DialogSuccess open={open} />
                </div>
            </div>
        )
    }
}

export default CreateBook;
