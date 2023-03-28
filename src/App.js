import { Card, CardContent } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { PaletteSwitch } from '@trautmann/theme-switch';

import SubnetForm from './SubnetForm';
import React from 'react';
import './App.css';
import SubnetsGrid from './SubnetsGrid';

import './SubnetCalculator';
import SubnetCalculator from './SubnetCalculator';

let subnetCalc = new SubnetCalculator();

function App() {

  const [rows, setRows] = React.useState([]);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [gradient, setGradient] = React.useState('gradient-dark');
  const [backgroundColor, setBackgroundColor] = React.useState('rgba(0, 0, 0, 0.5)');

  const [mode, setMode] = React.useState('dark');

  const theme = createTheme({
    transitions: {
      duration: {
        shortest: 450,
        shorter: 500,
        short: 550,
        // most basic recommended timing
        standard: 600,
        // this is to be used in complex animations
        complex: 875,
        // recommended when something is entering screen
        enteringScreen: 525,
        // recommended when something is leaving screen
        leavingScreen: 495,
      },
      easing: {
        // This is the most common easing curve.
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Objects enter the screen at full velocity from off-screen and
        // slowly decelerate to a resting point.
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        // Objects leave the screen at full velocity. They do not decelerate when off-screen.
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        // The sharp curve is used by objects that may return to the screen at any time.
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
    palette: {
      mode: mode,
    }
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

  React.useMemo(() =>
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
      <div id={gradient}>
        <Card className='Card' variant="outlined" style={styles.card}>
          <CardContent>
            <PaletteSwitch size="large" onChange={setMode} value={mode} />
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
