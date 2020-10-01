import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import AppWithNavigationState from './AppNavigator';

export default class App extends Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBPWgayfbyYN5FJD0t1OG9RquSMkH-aGIg',
      authDomain: 'whatsapp-44139.firebaseapp.com',
      databaseURL: 'https://whatsapp-44139.firebaseio.com',
      projectId: 'whatsapp-44139',
      storageBucket: 'whatsapp-44139.appspot.com',
      messagingSenderId: '363233484256'
    });

}
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
