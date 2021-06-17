import React from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import HowLongWereYouHere from './HowLongWereYouHere';

const TopAppBar: React.FC = () => {
  return (
    <AppBar position="sticky" style={{ color: 'black', backgroundColor: 'white' }}>
      <Toolbar>
        <Grid container direction="row" justify="space-between">
          <Typography>
            Irvins
          </Typography>
          
          <HowLongWereYouHere />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;
