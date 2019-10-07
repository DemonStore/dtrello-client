import React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    AppBar,
    Avatar,
    createStyles,
    CssBaseline,
    IconButton, List, ListItem, ListItemText, Popover,
    Theme,
    Toolbar,
    Tooltip,
    withStyles
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { push } from "connected-react-router";

import Columns from '../../ui/Columns';
import { actions as taskActions, ColumnData } from '../../service/tasks';

const styles = (theme: Theme) =>
    createStyles({
        wrapper: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'stretch'
        },
        appBar: {
            flexShrink: 0,
            flexGrow: 0
        },
        toolbar: {
            justifyContent: 'flex-end',
        },
        mainPart: {
            flex: '1 1 100%',
            overflowX: 'auto',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch'
        }
    });

interface TasksListComponentProps {
    classes: any;
    push: (path: string) => void;
    columns: ColumnData[];
    getColumns: () => void;
}

interface TasksListComponentState {
    avatarPopupAnchor: any;
}

class TasksList extends React.Component<TasksListComponentProps, TasksListComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            avatarPopupAnchor: null
        };
        this.handleAvatarPopupClose = this.handleAvatarPopupClose.bind(this);
        this.handleAvatarClick = this.handleAvatarClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.props.getColumns();
    }

    render() {
        const { avatarPopupAnchor } = this.state;
        const { classes, columns } = this.props;
        return (
            <div className={classes.wrapper}>
                <CssBaseline />
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Tooltip title="User menu">
                            <IconButton onClick={this.handleAvatarClick}>
                                <Avatar>
                                    <LockOutlinedIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Popover
                            anchorEl={avatarPopupAnchor}
                            open={Boolean(avatarPopupAnchor)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            onClose={this.handleAvatarPopupClose}
                        >
                            <List component="nav">
                                <ListItem
                                    button={true}
                                    onClick={this.handleLogout}
                                >
                                    <ListItemText primary="Sign out" />
                                </ListItem>
                            </List>
                        </Popover>
                    </Toolbar>
                </AppBar>
                <main className={classes.mainPart}>
                    <Columns columns={columns || []}></Columns>
                </main>
            </div>
        );
    }

    private handleAvatarClick(e: any) {
        this.setState({ avatarPopupAnchor: e.currentTarget });
    }

    private handleAvatarPopupClose() {
        this.setState({ avatarPopupAnchor: null });
    }

    private handleLogout() {
        this.handleAvatarPopupClose();
        this.props.push('/logout');
    }
}

const mapStateToProps = (state: any) => {
    return {
        columns: state.tasks.data
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    push: (path: string) => {
        dispatch(push(path));
    },
    getColumns: () => {
        dispatch(taskActions.data());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TasksList));
