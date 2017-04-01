import React from 'react';
import BaseWindow from '../BaseWindow';

export default class TerminalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bufferList: [] };
    }

    addLine() {

    }

    render() {
        return (
            <BaseWindow title="terminal">
                <pre className="buffer">{this.state.bufferList.join("\n")}</pre>
                <div className="prompt">$ <input type="text" /></div>
            </BaseWindow>
        );
    }
}
