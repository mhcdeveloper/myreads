import React from 'react';
import { Link } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const actions = [
    <Link to='/'>
        <FlatButton 
            label="Ok"
            primary
        />
    </Link>
];
const DialogSuccess = ({ open }) => (
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

export default DialogSuccess;