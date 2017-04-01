export default class Popup extends React.Component {
    hide() {
        console.log("Hide me");
    }

    render() {
        return (
            <div className="popup" onClick={this.hide}>
                {this.props.title ? <h3>{this.props.title}</h3> : ""}
                {this.props.children}
            </div>
        );
    }
}
