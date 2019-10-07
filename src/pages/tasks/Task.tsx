import React from 'react';
import { connect } from 'react-redux';

class Task extends React.Component<
    {},
    {}
    > {
    public render() {
        return (
            <div>
                Task
            </div>
        );
    }
}

export default connect(
    null,
    null
)(Task);
