import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import HomePage from './routes/home';
import TerminalPage from './routes/terminal';

export default class Session extends Component {
    render() {
        return (
            <Router>
                <div className="session">
                    <header>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/term">Terminal</Link>
                        </nav>
                        <span>mrsudo.exe</span>
                    </header>

                    <Switch>
                        <Route exact path="/"     component={HomePage} />
                        <Route       path="/term" component={TerminalPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
