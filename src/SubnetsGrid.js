import React from 'react';

import { DataGrid } from '@mui/x-data-grid';

const style = {
    height: '80%',
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
}

const columns = [
    { field: 'ipaddr', headerName: 'Network IP Address', width: 200 },
    { field: 'broadcast', headerName: 'Broadcast', width: 200 },
    { field: 'range', headerName: 'Range', width: 250 },
    { field: 'numhost', headerName: 'Number of Hosts', width: 200 },
    { field: 'realnumhost', headerName: 'Real Number of Hosts', width: 200 },
    { field: 'wastehost', headerName: 'Number of Wasted Hosts', width: 200 }
];

const SubnetsGrid = (props) => {

    return (
        <DataGrid 
            style={style}
            rows={props.rows}
            columns={columns}
            pageSize={props.pageSize}
            rowsPerPageOptions={[props.pageSize]}
        />
    )
}

export default SubnetsGrid;