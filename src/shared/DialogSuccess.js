import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        }
    }

    handleClose = () => {
        console.log('tes');
    }

    render() {
        const { open } = this.props;
        const actions = [
            <FlatButton 
                label="Ok"
                primary
                onClick={this.handleClose}
            />
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