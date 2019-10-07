import React from 'react';
import { Grid } from '@material-ui/core';

import Column from './Column';
import { ColumnData } from '../service/tasks';

class Columns extends React.Component<{
    columns: ColumnData[]
}, {}> {
    render() {
        const { columns } = this.props;
        return (
            <Grid container={true} alignItems="stretch" justify="flex-start" wrap="nowrap">
                {columns.map(column =>
                    <Column key={column.key} data={column}></Column>
                )}
            </Grid>
        );
    }
}

export default Columns;
