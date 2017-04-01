import React from 'react';
import ReactDOM from 'react-dom';

import Session from './components/Session';

// Invoke on DOM load, rather than wait for the whole page to be completely
// loaded (which may include external assets, ads, etc.). DOMContentLoaded isn't
// supported by IE8 or less.
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Session />,
        document.getElementById("app")
    );
});
