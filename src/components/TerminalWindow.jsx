import Window from './Window';

export default class TerminalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bufferList: ["Hello world", "v0.0.001"]
        };
    }

    render() {
        return (
            <Window title="Terminal">
                <pre class="buffer">{this.state.bufferList.join("\n")}</pre>
                <div className="prompt">$ <input type="text" /></div>
            </Window>
        );
    }
}
