import React from 'react';

export default class BaseWindow extends React.Component {
    render() {
        return (
            <div className={"window " + this.props.title}>
                {this.props.children}
            </div>
        );
    }
}
