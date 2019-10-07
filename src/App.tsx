import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Action, Dispatch } from 'redux';

import routes from './config/routes';
import themeConfig from './theme/config';
import { actions as authActions } from './service/auth';

interface AppComponentProps {
    classes?: any;
    loading: boolean;
    loadingText: string;
    isInitialized: boolean;
    theme: any;
    onInit: () => void;
}

interface AppComponentState {
}

class App extends React.Component<AppComponentProps, AppComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.onInit();
    }

    render() {
        const { theme, isInitialized } = this.props;
        return (
            isInitialized && (
                <MuiThemeProvider theme={theme}>
                    {renderRoutes(routes)}
                </MuiThemeProvider>
            )
        );
    }
}

const mapStateToProps = (state: any) => {
    const theme = createMuiTheme(themeConfig);
    return {
        loading: state.global.loading,
        loadingText: state.global.loadingText,
        isInitialized: state.auth.authorized !== undefined,
        theme: theme
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onInit: () => {
        dispatch(authActions.auth());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
