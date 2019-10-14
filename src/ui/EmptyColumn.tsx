import React from 'react';
import {
    Button,
    createStyles,
    Grid,
    Theme,
    withStyles
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const styles = (theme: Theme) => createStyles({
    column: {
        flexShrink: 0,
        overflowY: 'auto',
        padding: '16px',
        flexBasis: '320px',
        maxWidth: 'none'
    },
});

interface EmptyColumnComponentProps {
    classes: any;
    onColumnAdd: () => void;
}

class EmptyColumn extends React.Component<EmptyColumnComponentProps, {}> {
    render() {
        const { classes, onColumnAdd } = this.props;
        return (
            <Grid className={classes.column} item={true} xs={3}>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => onColumnAdd()}
                ><AddIcon /> Add column</Button>
            </Grid>
        );
    }
}

export default withStyles(styles)(EmptyColumn);
