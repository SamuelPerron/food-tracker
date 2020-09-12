import React, { useState } from 'react';

import Navbar from './Navigation/Navbar';

import '../../../styles/Layout/Navbar.scss';

const Header = props => {
    const [open, setOpen] = useState(false);

    return (
        <header>
            <div className={open ? 'open hamburger-icon' : 'hamburger-icon'} onClick={() => setOpen(!open)}>
                <div /><div /><div />
            </div>

            <Navbar open={open} close={() => setOpen(false)} user={props.user} />
        </header>
    );
}

export default Header;
