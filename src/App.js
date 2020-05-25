import React from 'react';
import MyMultiSelector from './components/multiSelectors/MyMultiSelector';

const App = () => (
  <div>
    <MyMultiSelector
      menuitemsprops={`color: white; font-size: 20px; background-color: black; width: 350px`}
      tagprops={`color: white; background-color: black; font-size:10px`}
      searchprops={`width: 60px`}
    />
    <MyMultiSelector
      tagprops={`color: white; background-color: #660033; font-size:12px`}
      searchprops={`width: 200px`}
    />
  </div>
);
export default App;
