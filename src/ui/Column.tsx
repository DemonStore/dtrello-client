import React from 'react';
import {
    Button,
    createStyles,
    Grid,
    Theme,
    Typography,
    withStyles
} from '@material-ui/core';

import { ColumnData } from '../service/tasks';
import Task from './Task';

const styles = (theme: Theme) => createStyles({
    column: {
        flexShrink: 0,
        overflowY: 'auto',
        padding: '16px'
    },
    columnTitle: {
        marginBottom: '16px'
    },
});

class Column extends React.Component<{
    classes: any,
    data: ColumnData
}, {}> {
    render() {
        const { data, classes } = this.props;
        return (
            <Grid className={classes.column} item={true} xs={3}>
                <Typography className={classes.columnTitle} color="inherit" variant="h5" component="h5">
                    {data.title}
                </Typography>
                {(data.tasks || []).map(task =>
                    <Task data={task} key={task.key}></Task>
                )}
                <Button size="small" color="primary" variant="contained">Add card</Button>
            </Grid>
        );
    }
}

export default withStyles(styles)(Column);
