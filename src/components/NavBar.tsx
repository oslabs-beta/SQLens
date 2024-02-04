import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
  // navigate functionality from react-router-dom
  const navigate = useNavigate();

  // useState hook to set anchor element of table
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // sets anchor element when react component is clicked (onClick)
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // sets anchor element to null
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // on logout, sets anchor element to null and navigates back to langing page
  const logout = () => {
    setAnchorEl(null);
    navigate('/');
  }

  // click handler to confirm download of migration file
  const confirmDownload = async () => {
    // pops up browser alert menu to confirm download
    const downloadConfirmation = window.confirm("Do you want to download the file?");

    // if user confirms
    if (downloadConfirmation) {
      try {
        const backendFilePath = './migration_log.txt';

        // Fetch the file content
        const response = await fetch(backendFilePath);
        const blob = await response.blob();

        // Create a temporary link element and trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'migration_log.txt'; //need to do this as a fetch request
        link.click();

        // Cleanup
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    } else {
      handleMenuClose();
    }
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      id={'primary-search-account-menu'}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
      onClick={confirmDownload}
      >Download Migration File</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: 'rgba(0, 0, 0, .25)', boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <div className="nav-title">
            <div id="nav-text" className="nav-title-text">
              SQL<span>ens</span>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
