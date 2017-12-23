import React, { Component } from 'react';
import { Text, ImageBackground, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, SocialIcon } from 'react-native-elements'
import { enterEmail, enterPassword, signUp, nameChanged, toLoginScreen } from '../actions';
import { Cardtwo, CardStart, Spinner, Popup } from './common';
import background from './image/bg.png';
import logo from './image/whatsapp.png'

class SignupForm extends Component {

  nameText(text) {
    this.props.nameChanged(text);
  }

  onEmailChange(text) {
    this.props.enterEmail(text);
  }

  onPasswordChange(text) {
    this.props.enterPassword(text);

  }

  onSignupPress(){
    const { email, password, name } = this.props;

    this.props.signUp({ email, password, name });
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
        onPress={this.onSignupPress.bind(this)}
        title= 'Sign Up'
      />
    );
  }


    render() {
        return (
          <ImageBackground source={background} style={{flex:1}} >
            <ScrollView>
              <Cardtwo>
                  <View>
                    <Image
                      source = {logo}
                      style={styles.imageStyle}
                    />
                  </View>
                  <View>
                    <FormLabel labelStyle={styles.labelStyles}>Nama</FormLabel>
                    <FormInput
                      inputStyle = {styles.formInputStyle}
                      placeholder="Enter Your Name"
                      onChangeText={this.nameText.bind(this)}
                      value={this.props.name}
                      placeholderTextColor= "#d6ec20"
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
                      secureTextEntry
                      inputStyle = {styles.formInputStyle}
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
              </Cardtwo>
            </ScrollView>
          </ImageBackground>
        );
    }
}
const styles = {
  errorTextStyle: {
    fontSize: 20,
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

const mapStateToProps = ({ authsignup }) => {
  const { name, email, password, loading, error } = authsignup;

  return { name, email, password, loading, error };
};
export default connect(mapStateToProps, {
  enterEmail, enterPassword, signUp, nameChanged, toLoginScreen
})(SignupForm);
