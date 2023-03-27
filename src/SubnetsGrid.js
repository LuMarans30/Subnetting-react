import React from 'react';

import { DataGrid } from '@mui/x-data-grid';

const style = {
    height: '80%',
    width: '0%',
    marginTop: 50,
    padding: 50,
    border: '0px'
}

const columns = [
    { field: 'ipaddr', headerName: 'Network IP Address', flex: 1},
    { field: 'broadcast', headerName: 'Broadcast', flex: 1 },
    { field: 'range', headerName: 'Range', flex: 1 },
    { field: 'numhost', headerName: 'Number of Hosts', flex: 1},
    { field: 'realnumhost', headerName: 'Real Number of Hosts', flex: 1},
    { field: 'wastehost', headerName: 'Number of Wasted Hosts', flex: 1},
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