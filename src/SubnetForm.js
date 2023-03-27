import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { v4 } from 'isipaddress';

//Styles for the form
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  h2: {
    textAlign: 'center'
  }
}

const SubnetForm = (props) => {
  const [ipaddr, setIpaddr] = useState('')
  const [numhost, setNumhost] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    console.log(ipaddr, " - numhost: ", numhost)

    //disable the two fields: ipaddr and cidr
    document.getElementById('ipaddr').disabled = true;

    props.OnSubmit(ipaddr, numhost)
  }

  function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} style={styles.form}>
        <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
          <h2 style={styles.h2}>Create a new subnet</h2>
          <TextField
            id='ipaddr'
            type="text"
            variant='outlined'
            color='secondary'
            label="Starting IPv4 address"
            onChange={e => setIpaddr(e.target.value)}
            error={ipaddr.length > 0 && !v4(ipaddr)}
            value={ipaddr}
            helperText="e.g. 192.168.0.0"
            required
          />
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="Number of hosts"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            error={numhost.length > 0 && (numhost < 1 || numhost > 4294967295 || !isNumeric(numhost))}
            helperText="must be greater than 1"
            onChange={e => setNumhost(e.target.value)}
            value={numhost}
            required
          />
        </Stack>
        <Button color="secondary" variant="outlined" type="submit">Add Subnet</Button>
      </form>
    </React.Fragment>
  )
}

export default SubnetForm;