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
const DialogSuccess = ({ open, title }) => (
    <div>
       <Dialog
            actions={actions}
            title="My Reads"
            modal={true}
            open={open}
        >
        {title}
        </Dialog>
    </div>
)

export default DialogSuccess;