import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import HomePage from './routes/home';
import TerminalPage from './routes/terminal';

// TODO Prepend a login/registration layer
export default class Root extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className='session'>
                    <header>
                        <nav>
                            <Link to='/'>Home</Link>
                            <Link to='/term'>Terminal</Link>
                        </nav>
                        <span>mrsudo</span>
                    </header>

                    <Switch>
                        <Route exact path='/'     component={HomePage} />
                        <Route       path='/term' component={TerminalPage} />
                        {/* <Route component={NoMatch} /> */}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
