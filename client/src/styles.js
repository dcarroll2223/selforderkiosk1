import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => {
  return {
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    navy: {
      backgroundColor: '#003080',
    },
    red: {
      backgroundColor: '#ff2040',
      color: '#fff',
    },
    green: {
      backgroundColor: '#00b020',
    },
    hover1: {
      '&:hover': {
        backgroundColor: '#00b020',
      },
    },
    box1: {
      paddingLeft: 5,
      paddingRight: 0,
      paddingTop: 10,
      paddingBottom: 10,
      margin: 0,
    },
    main: {
      flex: 1,
      overflow: 'auto',
      flexDirection: 'column',
      display: 'flex',
      color: '#ffffff',
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    center1: {
      textAlign: 'center',
    },
    largeLogo: {
      height: 100,
    },
    logo: {
      height: 50,
    },
    cards: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card1: {
      margin: 10,
    },
    card: {
      margin: 10,
      padding: 5,
    },
    card3: {
      padding: 0,
    },
    card2: {
      marginLeft: 20,
      marginBottom: 5,
      marginTop: 5,
      padding: 5,
    },
    title: {
      marginLeft: 20,
      marginTop: 18,
    },
    largeButton: {
      width: 250,
    },
    largeInput: {
      width: '60px!important',
      padding: '0!important',
      fontSize: '35px!important',
      textAlign: 'center!important',
    },
    bordered: {
      borderWidth: 2,
      borderRadius: 5,
      margin: 5,
      borderStyle: 'solid',
    },
    row: {
      display: 'flex',
      padding: 10,
    },
    around: {
      justifyContent: 'space-around',
    },
    between: {
      justifyContent: 'space-between',
    },
    column: {
      flexDirection: 'column',
    },
    space: {
      padding: 10,
    },
    ptop: {
      paddingTop: 5,
    },
  };
});
