import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import Logo from '../components/Logo';
import { TouchApp } from '@mui/icons-material';
import { useStyles } from '../styles';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate('/choose')}>
        <Box
          className={[classes.root, classes.red]}
          sx={{
            color: {
              xs: '#000 !important',
              sm: '#fff !important',
              md: '#fff',
              lg: '#fff',
              xl: '#fff',
            },
            backgroundColor: {
              xs: '#fff',
              sm: '#ff2040',
              md: '#ff2040',
              lg: '#ff2040',
              xl: '#ff2040',
            },
          }}
        >
          <Box
            className={[classes.main, classes.center]}
            sx={{
              color: {
                xs: '#000',
                sm: '#fff',
                md: '#fff',
                lg: '#fff',
              },
            }}
          >
            <Typography variant="h6">Fast & Easy</Typography>
            <Typography variant="h1">
              Order <br /> & pay <br /> here
            </Typography>
            <TouchApp fontSize="large"></TouchApp>
          </Box>
          <Box
            className={[classes.center, classes.green]}
            sx={{
              color: {
                xs: '#000',
                sm: '#fff',
                md: '#fff',
                lg: '#fff',
              },
              backgroundColor: {
                xs: '#fff',
                sm: '#00b020',
                md: '#00b020',
                lg: '#00b020',
              },
              paddingBottom: {
                xs: 10,
                sm: 0,
              },
            }}
          >
            <Logo large></Logo>
            <Typography variant="h5">Touch to start</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
