import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => { setTimeNow(new Date()); }, 1000);
  }, [])

    return(
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>{timeNow.toDateString()}</Grid>
          <Grid item xs={6}>{timeNow.toTimeString()}</Grid>
        </Grid>
      </div>
    );
};

export default Clock;