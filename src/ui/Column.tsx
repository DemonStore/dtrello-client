import React from 'react';
import {
    Button,
    createStyles,
    Grid, IconButton, Menu, MenuItem, TextField,
    Theme,
    Typography,
    withStyles
} from '@material-ui/core';
import { MoreVert as MoreVertIcon, Done as DoneIcon, Close as CloseIcon } from '@material-ui/icons';

import { actions as taskActions, ColumnData, TaskData } from '../service/tasks';
import Task from './Task';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { sortAsc } from '../helpers/sort';

const styles = (theme: Theme) => createStyles({
    column: {
        flexShrink: 0,
        flexBasis: '320px',
        maxWidth: 'none',
        overflowY: 'auto',
        padding: '16px'
    },
    headerStatic: {
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    headerTitle: {
        flexGrow: 1
    },
    headerMenu: {
        flexShrink: 0
    },
    headerEditing: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px'
    }
});

export interface ColumnComponentProps {
    classes: any;
    data: ColumnData;
    taskAdd: (columnId: number, sequence: number) => void;
    columnEdit: (columnId: number, columnUpdate: any) => void;
    columnDelete: (columnId: number) => void;
}

export interface ColumnComponentState {
    optionsMenuAnchor: any;
    editMode: boolean;
    editName: string;
}

class Column extends React.Component<ColumnComponentProps, ColumnComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            optionsMenuAnchor: null,
            editMode: false,
            editName: ''
        };
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editColumn = this.editColumn.bind(this);
        this.saveColumn = this.saveColumn.bind(this);
        this.endEditingColumn = this.endEditingColumn.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
    }

    render() {
        const { data, classes } = this.props;
        const { optionsMenuAnchor, editMode, editName } = this.state;
        const orderedTasks = sortAsc(data.tasks || []);
        return (
            <Grid className={classes.column} item={true} xs={3}>
                {editMode
                    ? (<div className={classes.headerEditing}>
                        <TextField
                            autoFocus
                            id="title"
                            label="Title"
                            type="text"
                            margin="none"
                            fullWidth
                            defaultValue={editName}
                            onBlur={this.handleTitleUpdate}
                        />
                        <IconButton onClick={() => this.saveColumn()}>
                            <DoneIcon></DoneIcon>
                        </IconButton>
                        <IconButton onClick={() => this.endEditingColumn()}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </div>)
                    : (
                        <div className={classes.headerStatic}>
                            <Typography
                                className={classes.headerTitle}
                                color="inherit"
                                variant="h5"
                                component="h5"
                            >
                                {data.title}
                            </Typography>
                            <IconButton className={classes.headerMenu} onClick={this.handleOpenMenu}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={optionsMenuAnchor}
                                keepMounted
                                open={Boolean(optionsMenuAnchor)}
                                onClose={this.handleCloseMenu}
                            >
                                <MenuItem onClick={() => this.editColumn()}>Edit name</MenuItem>
                                <MenuItem onClick={() => this.deleteColumn()}>Delete</MenuItem>
                            </Menu>
                        </div>
                    )}
                {(orderedTasks).map(task =>
                    <Task data={task} key={task.key}></Task>
                )}
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => this.addTask()}
                >Add card</Button>
            </Grid>
        );
    }

    private addTask() {
        const column = this.props.data;
        const columnId = column.key;
        const maxSequence = column.tasks.reduce((max: number, task: TaskData) => {
            return (task.sequence > max) ? task.sequence : max;
        }, 0);
        this.props.taskAdd(columnId, maxSequence + 1);
    }

    private handleTitleUpdate(event: any) {
        this.setState({
            editName: event.target.value
        });
    }

    private editColumn(): void {
        this.handleCloseMenu();

        this.setState({
            editMode: true,
            editName: this.props.data.title
        });
    }

    private saveColumn(): void {
        const columnId = this.props.data.key;
        const columnUpdate = {
            title: this.state.editName
        };
        this.props.columnEdit(columnId, columnUpdate);
        this.endEditingColumn();
    }

    private endEditingColumn(): void {
        this.setState({
            editMode: false,
            editName: ''
        });
    }

    private deleteColumn(): void {
        this.handleCloseMenu();

        const column = this.props.data;
        const columnId = column.key;
        const tasks = column.tasks || [];

        if (tasks.length) {
            return;
        }

        this.props.columnDelete(columnId);
    }

    private handleOpenMenu(e: any) {
        this.setState({ optionsMenuAnchor: e.currentTarget });
    }

    private handleCloseMenu(): void {
        this.setState({ optionsMenuAnchor: null });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    taskAdd: (columnId: number, sequence: number) => {
        dispatch(taskActions.taskAdd(columnId, sequence));
    },
    columnEdit: (columnId: number, columnUpdate: any) => {
        dispatch(taskActions.columnEdit(columnId, columnUpdate));
    },
    columnDelete: (columnId: number) => {
        dispatch(taskActions.columnDelete(columnId));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(Column));
