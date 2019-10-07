import React from 'react';
import { connect } from 'react-redux';

class NotFound extends React.Component<
    {},
    {}
> {
    public render() {
        return (
            <div>
                Not found
            </div>
        );
    }
}

export default connect(
    null,
    null
)(NotFound);
