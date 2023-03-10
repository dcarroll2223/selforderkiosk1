import React from 'react';
import { useStyles } from '../styles';

export default function Logo(props) {
  const { classes } = useStyles();
  return (
    <img
      src="/images/logo.png"
      alt="Food order"
      className={props.large ? classes.largeLogo : classes.logo}
    />
  );
}
