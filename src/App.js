import { Card, CardContent } from '@mui/material';
import SubnetForm from './SubnetForm';
import React from 'react';
import './App.css';
import SubnetsGrid from './SubnetsGrid';

import './SubnetCalculator';
import SubnetCalculator from './SubnetCalculator';

//Align the form in the center of the page vertically
const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 700,
    //Transparent blurry background
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(6px)',
    borderRadius: 10
  }
}

var subnetCalc = new SubnetCalculator();

function App() {

  const [rows, setRows] = React.useState([]);

  return (
    <div className='App'>
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
  );
}

export default App;
