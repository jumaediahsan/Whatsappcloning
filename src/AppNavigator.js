import React, { Component } from 'react';
import { View, TouchableOpacity, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import ChattScreen from './components/ChattScreen';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import MainScreenNavigator from './components/mainscreen/MainScreenNavigator';
// import ContactDetail from './mainscreen/ContactDetail';

const styles = {
  wrapContent: {
    flexDirection: 'row'
  }
}

export const AppNavigator = StackNavigator({
  LoginForm: {
    screen: LoginForm,
    navigationOptions: {
      header: false
    }
   },
  SignupForm: { screen: SignupForm,
    navigationOptions: {
      header: false
    }
   },
  MainScreenNavigator: {
    screen: MainScreenNavigator,
    navigationOptions: ({navigation }) => {
      return {
        title: 'WhatsApp',
        headerStyle: { backgroundColor: '#0f4d01' },
        headerTitleStyle: { color: 'white' },
        headerRight: (
          <View style={styles.wrapContent}>
            <View style={{paddingRight: 20}}>
              <TouchableOpacity><Icon name = 'search' iconStyle={{color: 'white'}} /></TouchableOpacity>
            </View>
            <View style={{paddingRight: 10}}>
              <TouchableOpacity ><Icon name = 'more-vert' iconStyle={{color: 'white'}}/></TouchableOpacity>
            </View>
          </View>
        )
      }
    },
   },
  ChattScreen: { screen: ChattScreen },
  // ContactDetail: {screen: ContactDetail},
});

const AppWithNavigationState = ({dispatch, nav}) => {
  console.log(nav);
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState)
