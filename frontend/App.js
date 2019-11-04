import React from 'react';


import Navigation from './Components/Navigation/Navigation';

import pictures from './Components/Reducers/pictures.reducer';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({pictures}));


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>);
  }
}


