/* eslint-disable */
import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MenuNav = ({ component: Component }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("jwt");
        location.reload();
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="primary"
                    style={{margin: 10}} onClick={handleClick}>
                Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem ><Link to="/article">Article</Link></MenuItem>
                <MenuItem ><Link to="/product">Product</Link></MenuItem>
                <MenuItem ><Link onClick={handleLogout}>Logout</Link></MenuItem>
            </Menu>

        </div>
    );
};
export default MenuNav;