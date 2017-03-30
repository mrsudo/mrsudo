import Window from './Window';

export default class DialogWindow extends React.Component {
    render() {
        return (
            <Window title="dialog" chrome={false}>
                {this.state.message}
                {this.state.options.map((opt) => (
                    <button name={opt} />
                ))}
            </Window>
        );
    }
}
