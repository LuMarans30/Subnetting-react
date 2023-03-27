import { Card, CardContent  } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material/';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';

import SubnetForm from './SubnetForm';
import React from 'react';
import './App.css';
import SubnetsGrid from './SubnetsGrid';

import './SubnetCalculator';
import SubnetCalculator from './SubnetCalculator';

var subnetCalc = new SubnetCalculator();

function App() {

  const [rows, setRows] = React.useState([]);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [gradient, setGradient] = React.useState('gradient-dark');
  const [backgroundColor, setBackgroundColor] = React.useState('rgba(0, 0, 0, 0.5)');

  const [mode, setMode] = React.useState('dark');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  //Align the form in the center of the page vertically
  let styles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 700,
      //Transparent blurry background
      backgroundColor: backgroundColor,
      backdropFilter: 'blur(6px)',
      borderRadius: 10
    }
  }

  React.useMemo( () =>
    setMode(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode]
  );

  //On theme change, change the gradient
  React.useEffect(() => {
    setGradient(mode === "dark" ? 'gradient-dark' : 'gradient-light');
    setBackgroundColor(mode === "dark" ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)');
  }, [prefersDarkMode, mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton onClick={() => {
        mode === 'dark' ? setMode('light') : setMode('dark');
        console.log(theme);
      }}>
        {mode === 'dark' ? (<LightMode />) : (<DarkMode />)}
      </IconButton>

      <div id={gradient}>
        <Card className='Card' variant="outlined" style={styles.card}>
          <CardContent>
            <SubnetForm
              OnSubmit={(ipaddr, numhost) => {
                subnetCalc.addSubnet(ipaddr, numhost);
                subnetCalc.createRows();
                setRows(subnetCalc.getRows());
              }}
            />
          </CardContent>
        </Card>
        <SubnetsGrid
          pageSize={3}
          rows={rows}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
