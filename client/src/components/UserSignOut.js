import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// eslint-disable-next-line
export default ({ context }) => {
    /* component calls signOut and updates state after render */
    useEffect(() => context.actions.signOut());

    return (
        <Redirect to='/' />
    );
}