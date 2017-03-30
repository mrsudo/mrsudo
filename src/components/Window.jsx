export default class Window extends React.Component {
    render() {
        return (
            <div className="window">
                <div className="titlebar">
                    <div className="title">
                        {this.props.title}
                    </div>

                    <div className="buttons">
                        <button>_</button>
                        <button>+</button>
                        <button>X</button>
                    </div>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
