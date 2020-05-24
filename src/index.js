import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import './App.css';

import MySelector from './components/selector/MySelector';
import MyMultiSelector from './components/multiSelectors/MyMultiSelector';

const App = () => (
  <div>
    <MySelector />
    <MyMultiSelector />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
