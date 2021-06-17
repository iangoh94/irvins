import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

const HowLongWereYouHere: React.FC = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { setSeconds(seconds + 1)}, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds])

  return(
    <Typography>
      You have been here for {seconds > 60 ? Math.floor(seconds / 60) + ' minute(s) and ' : undefined} {seconds % 60} second(s).
    </Typography>
  )
}

export default HowLongWereYouHere;