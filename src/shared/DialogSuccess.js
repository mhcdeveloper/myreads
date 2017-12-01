import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        }
    }

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
                    Only Teste
                </Dialog>
            </div>
        )
    }
}

export default DialogSuccess;