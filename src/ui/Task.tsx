import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, createStyles, Theme, withStyles } from '@material-ui/core';

import { TaskData } from '../service/tasks';

const styles = (theme: Theme) => createStyles({
    task: {
        marginBottom: '8px'
    }
});

class Task extends React.Component<{
    classes: any,
    data: TaskData
}, {}>{
    render() {
        const { data, classes } = this.props;

        return (
            <Card className={classes.task}>
                <CardHeader title={data.title} />
                <CardContent>
                    {data.description}
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Task);
