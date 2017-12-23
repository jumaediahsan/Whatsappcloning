import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button, SocialIcon } from 'react-native-elements'
import { emailChanged, passwordChanged, loginUser, toMainScreen, toLoginScreen } from '../actions';
import { Card, CardStart, Spinner } from './common';
import background from './image/bg.png';
import logo from './image/whatsapp.png';

class LoginForm extends Component {
  // componentWillMount() {
  //   firebase.auth().onAuthStateChanged((user) =>{
  //       if (user) {
  //           this.props.toMainScreen()
  //       }else {
  //           this.props.toLoginScreen()
  //       }
  //     })
  // }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);

  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }

    return (
      <Button
        buttonStyle = {styles.buttonStyle}
        borderRadius={20}
        backgroundColor= 'transparent'
        icon={{name: 'account-circle', size: 25}}
        onPress={this.onButtonPress.bind(this)}
        title= 'Sign In'
      />
    );
  }
    render() {
      const { navigate } = this.props.navigation;
        return (
          <ImageBackground source={background} style={{flex:1}} >
            <ScrollView>
                <Card>
                  <View>
                    <Image
                        source = {logo}
                        style={styles.imageStyle}
                      />
                    </View>
                    <View>
                        <FormLabel labelStyle={styles.labelStyles}>Email</FormLabel>
                        <FormInput
                          inputStyle = {styles.formInputStyle}
                          placeholder="email@gmail.com"
                          onChangeText={this.onEmailChange.bind(this)}
                          value={this.props.email}
                          placeholderTextColor= "#d6ec20"
                        />
                    </View>
                    <View>
                      <FormLabel labelStyle={styles.labelStyles}>Password</FormLabel>
                      <FormInput
                        inputStyle = {styles.formInputStyle}
                        secureTextEntry
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        placeholderTextColor= "#d6ec20"
                      />
                    </View>
                    <FormValidationMessage>
                      {this.props.error}
                    </FormValidationMessage>
                    <CardStart>
                        {this.renderButton()}
                    </CardStart>
                      <Text style={styles.textStyle}>Belum Punya akun </Text>
                      <Text onPress = {() => navigate('SignupForm')} style={styles.textStyle}>
                        Daftar Disini !
                      </Text>
                  </Card>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles= {
  errorTextStyle: {
    fontSize: 40,
    alignSelf: 'center',
    color: 'red'
  },
  labelStyles : {
    fontSize: 18,
    color: 'white',
    paddingRight: 25,
    paddingLeft: 25,
  },
  buttonStyle: {
    width: 260,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center'
  },
  textStyle: {
    color: '#fff',
    fontSize: 15
  },
  formInputStyle: {
    fontSize: 18,
    color: 'white',
    paddingRight: 30,
    paddingLeft: 30,
  },
  imageStyle: {
    height: 120,
    width: 140
  }
};

const mapStateToProps = ({ authsign }) => {
  const { email, password, error, loading } = authsign;

  return { email, password, error, loading };
};
export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, toMainScreen, toLoginScreen
 })(LoginForm);
