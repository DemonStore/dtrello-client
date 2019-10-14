import React from 'react';
import { Grid } from '@material-ui/core';

import Column from './Column';
import { ColumnData } from '../service/tasks';
import EmptyColumn from './EmptyColumn';
import { sortAsc } from '../helpers/sort';

interface ColumnsComponentProps {
    columns: ColumnData[];
    onColumnAdd: () => void;
}

class Columns extends React.Component<ColumnsComponentProps, {}> {
    render() {
        const { columns, onColumnAdd } = this.props;
        const orderedColumns = sortAsc(columns);
        return (
            <Grid container={true} alignItems="stretch" justify="flex-start" wrap="nowrap">
                {orderedColumns.map(column =>
                    <Column key={column.key} data={column}></Column>
                )}
                <EmptyColumn onColumnAdd={() => onColumnAdd()}></EmptyColumn>
            </Grid>
        );
    }
}

export default Columns;
