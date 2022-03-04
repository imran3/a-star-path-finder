import { Container, Row } from 'react-bootstrap';

import './App.css';
import { colors } from './constants';
import { TopNavbar } from './components/top-navbar';
import { Grid } from './components/grid';
import { Footer } from './components/footer';

export const App = () => {
  return (
    <div className="App" style={{ backgroundColor: colors.NaplesYellow }}>
      <TopNavbar></TopNavbar>
      <Grid></Grid>
      <Footer></Footer>
    </div>
  );
};

export default App;
