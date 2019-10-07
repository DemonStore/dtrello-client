import React from 'react';
import { connect } from 'react-redux';
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    createStyles,
    withStyles,
    TextField,
    Typography, Theme
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { Action, Dispatch } from 'redux';

import { actions as authActions } from '../../service/auth';

const styles = (theme: Theme) => {
    return createStyles({
        '@global': {
            body: {
                backgroundColor: theme.palette.common.white,
            },
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    });
};

class Login extends React.Component<{
        classes: any;
        onLogin: (
            username: string,
            password: string,
        ) => boolean;
    },
    {
        username: string;
        password: string;
    }> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.onLogin = this.onLogin.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => this.onUsernameChange(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => this.onPasswordChange(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onLogin}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }

    private onLogin(event: any) {
        this.props.onLogin(
            this.state.username,
            this.state.password,
        );
        event.preventDefault();
    }

    private onUsernameChange(username: string) {
        this.setState({ username });
    }

    private onPasswordChange(password: string) {
        this.setState({ password });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogin: (username: string, password: string): boolean => {
        if (!username || !password) {
            return false;
        }

        dispatch(authActions.login({username, password}));
        return true;
    }
});

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(Login));
