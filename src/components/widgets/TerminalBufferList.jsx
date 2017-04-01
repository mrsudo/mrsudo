import React from 'react';

export default class TerminalBufferList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bufferList: [] };
    }

    render() {
        return (
            <div>
                <pre className="buffer">{this.state.bufferList.join("\n")}</pre>
                <div className="prompt">$ <input type="text" /></div>
            </div>
        );
    }
}
