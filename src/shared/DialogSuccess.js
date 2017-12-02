import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogSuccess extends Component {
    render() {
        const { open } = this.props;
        const actions = [
            <Link to='/'>
                <FlatButton 
                    label="Ok"
                    primary
                />
            </Link>
        ]
        return (
            <div>
                <Dialog
                    actions={actions}
                    title="Cadastro efetuado com sucesso!"
                    modal={true}
                    open={open}
                >
                    O livro foi cadastrado com sucesso!! Clique no botão e retornará para lista dos livros!!
                </Dialog>
            </div>
        )
    }
}

export default DialogSuccess;