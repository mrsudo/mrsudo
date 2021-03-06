import React from 'react';
import BaseWindow from '../BaseWindow';
import io from 'socket.io-client';

export default class TerminalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bufferList: [], command: [] };
    }

    componentDidMount() {
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('stdout', (message) => {
            if (!message || message.length === 0) message = "\n";
            this.setState({bufferList: this.state.bufferList.concat([message])});
        });
        this.socket.on('stderr', (message) => {
            if (!message || message.length === 0) message = "\n";
            this.setState({bufferList: this.state.bufferList.concat(["ERROR: " + message])});
        });
    }

    execute = (e) => {
        console.log(`Executing: ${this.input.value}`);
        this.setState({bufferList: this.state.bufferList.concat(["$ " + this.input.value])});
        this.socket.emit('execute', { command: this.input.value });
        this.input.value = "";
        e.preventDefault();
    }

    autocomplete = (e) => {
        console.log(`Autocomplete: ${e.target.value}`);
    }

    render() {
        return (
            <BaseWindow title="terminal">
                <pre className="buffer">{this.state.bufferList.join("\n")}</pre>
                <form className="prompt" onSubmit={this.execute}>
                    $ <input autoFocus type="text" ref={input => this.input = input} onChange={this.autocomplete} />
                </form>
            </BaseWindow>
        );
    }
}
