import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { actions as authActions } from '../../service/auth';

class Logout extends React.Component<{
    handleLogout: () => void;
}, {}>{

    componentDidMount() {
        this.props.handleLogout();
    }

    render() {
        return (
            <div>Logging out...</div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    handleLogout: () => {
        dispatch(authActions.logout());
    },
});

export default connect(
    null,
    mapDispatchToProps
)(Logout);
