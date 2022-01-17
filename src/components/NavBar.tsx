import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const Navbar = () => {

  return (
    <AppBar position="static" style={{backgroundColor: "#7b1fa2"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2 }}
          >
            Anime Search App
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
