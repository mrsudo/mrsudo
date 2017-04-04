import React from 'react';
import { render } from 'react-dom';

import Root from './components/Root';

// Invoke on DOM load, rather than wait for the whole page to be completely
// loaded (which may include external assets, ads, etc).
//
// NOTE DOMContentLoaded isn't supported on IE <= 8.
document.addEventListener('DOMContentLoaded', () => {
    render(
        <Root />,
        document.getElementById('app')
    );
});

