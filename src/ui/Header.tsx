import React, { Component } from 'react';
import {
    AppBar,
    Avatar, createStyles,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Popover,
    Theme,
    Toolbar,
    Tooltip, withStyles
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { push } from "connected-react-router";

const styles = (theme: Theme) =>
    createStyles({
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

interface HeaderComponentProps {
    classes: any;
    push: (path: string) => void;
}

interface HeaderComponentState {
    avatarPopupAnchor: any;
}

class Header extends Component<HeaderComponentProps, HeaderComponentState> {
    constructor (props: any) {
        super(props);

        this.state = {
            avatarPopupAnchor: null
        };

        this.handleAvatarPopupClose = this.handleAvatarPopupClose.bind(this);
        this.handleAvatarClick = this.handleAvatarClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    render() {
        const { avatarPopupAnchor } = this.state;
        const { classes } = this.props;

        return (
            <AppBar position="static">
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    push: (path: string) => {
        dispatch(push(path));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(Header));
