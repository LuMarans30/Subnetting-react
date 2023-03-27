import React from 'react';

import { DataGrid } from '@mui/x-data-grid';

const style = {
    height: '80%',
    width: '65%',
    marginTop: 20,
    padding: 50
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
            sx={{
                '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                    height: 8,
                    width: 8,
                    background: '#F5F5F5',
                    borderRadius: 10,
                },
                '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                    borderRadius: 10,
                    background: '#F5F5F5',
                    height: 8,
                },
                '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                    backgroundColor: '#555',
                    borderRadius: 10,
                }
            }}
        />
    )
}

export default SubnetsGrid;