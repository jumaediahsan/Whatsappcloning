import React,{ Component } from 'react';
import {View, ScrollView} from 'react-native';
import Header from './toolProfile/Header';
import BodyProfile from './toolProfile/BodyProfile';

class Profile extends Component {
    render() {
        return (
          <ScrollView>
            <View style={{flex:1}}>
              <Header />
              <BodyProfile />
            </View>
          </ScrollView>
        );
    }
}

export default Profile;
