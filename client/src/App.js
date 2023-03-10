import { Container, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChooseScreen from './screens/ChooseScreen';
import OrderScreen from './screens/OrderScreen';
import ReviewScreen from './screens/ReviewScreen';
import CompleteOrderScreen from './screens/CompleteOrderScreen';

const theme = createTheme({
  typography: {
    h1: { fontWeight: 'bold' },
    h2: {
      fontSize: '2rem',
      color: 'black',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#fff',
    },
  },
  palette: {
    primary: { main: '#ff1744' },
    secondary: {
      main: '#118e16',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/choose" element={<ChooseScreen />} />
              <Route path="/order" element={<OrderScreen />} />
              <Route path="/review" element={<ReviewScreen />} />
              <Route path="/payment" element={<ReviewScreen />} />
              <Route path="/complete" element={<CompleteOrderScreen />} />
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
