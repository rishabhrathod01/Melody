/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import StackNavigator from './screens/StackNavigator/StackNavigator';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <StackNavigator/>
      </Provider>
    );
  }
}
