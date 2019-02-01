import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Home from './screens/Home';
import AddList from './screens/AddList';
import List from './screens/List';
import EditList from './screens/EditList';

// Create navigation
const RootSwitch = createSwitchNavigator({
    Home,
    AddList,
    List,
    EditList
  },
  {
    // Start screen is loading screen
    initialRouteName: 'Home'
  }
);

const App = createAppContainer(RootSwitch);

export default App;
