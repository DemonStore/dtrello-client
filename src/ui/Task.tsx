import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    createStyles,
    IconButton, Menu, MenuItem,
    Theme,
    withStyles
} from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Action, Dispatch } from 'redux';

import { actions as taskActions, TaskData } from '../service/tasks';

const styles = (theme: Theme) => createStyles({
    task: {
        marginBottom: '8px'
    }
});

export interface TaskComponentProps {
    classes: any;
    data: TaskData;
    push: (path: string) => void;
    taskDelete: (taskId: number) => void;
}

export interface TaskComponentState {
    optionsMenuAnchor: any;
}

class Task extends React.Component<TaskComponentProps, TaskComponentState>{
    constructor(props: any) {
        super(props);

        this.state = {
            optionsMenuAnchor: null
        };
        this.openEditPage = this.openEditPage.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
    }

    render() {
        const { optionsMenuAnchor } = this.state;
        const { data, classes } = this.props;
        const createdAt = (new Date(data.createdAt)).toDateString();
        return (
            <Card className={classes.task}>
                <CardHeader
                    title={data.title}
                    subheader={createdAt}
                    action={
                        <IconButton onClick={e => this.handleOpenMenu(e)}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    {data.description}
                </CardContent>
                <Menu
                    anchorEl={optionsMenuAnchor}
                    keepMounted
                    open={Boolean(optionsMenuAnchor)}
                    onClose={this.handleCloseMenu}
                >
                    <MenuItem onClick={() => this.openEditPage()}>Edit</MenuItem>
                    <MenuItem onClick={() => this.deleteTask()}>Delete</MenuItem>
                </Menu>
            </Card>
        );
    }

    openEditPage(): void {
        this.handleCloseMenu();

        const taskId = this.props.data.key;
        this.props.push(`/tasks/${taskId}`);
    }

    deleteTask(): void {
        this.handleCloseMenu();

        const taskId = this.props.data.key;
        this.props.taskDelete(taskId);
    }

    handleOpenMenu(e: any) {
        this.setState({ optionsMenuAnchor: e.currentTarget });
    }

    handleCloseMenu(): void {
        this.setState({ optionsMenuAnchor: null });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    push: (path: string) => {
        dispatch(push(path));
    },
    taskDelete: (taskId: number) => {
        dispatch(taskActions.taskDelete(taskId));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(Task));
