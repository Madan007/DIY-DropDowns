import * as React from 'react';
import { render } from 'react-dom';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import './App.css';

import { SelectExample } from './SelectExample';

const App = () => (
  <div>
    <SelectExample />
  </div>
);

render(<App />, document.getElementById('root'));
