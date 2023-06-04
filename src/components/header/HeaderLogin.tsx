import React, { useState } from 'react';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HeaderLogin = (props) => {

    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    className='header-top-sticky'
                    style={{ margin: 0, padding: 0 }}
                >
                    <span style={{ marginLeft: 15 }}>
                        <Avatar alt={props.user.name.firstname} src={props.user.avatar} sx={{ width: 25, height: 25 }} />
                    </span>
                    <span>
                        {props.user.name.firstname + " " + props.user.name.lastname}
                    </span>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    Tài Khoản Của Tôi
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng Xuất
                </MenuItem>
            </Menu>
        </>
    )
}

export default HeaderLogin