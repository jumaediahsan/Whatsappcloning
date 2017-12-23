import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import Backend  from './Backend';
import background from './image/background.jpg';

class Chatt extends Component {
  static navigationOptions = ({navigation}) => ({
   title: navigation.state.params.name,
 });
  state = {
    messages: [],
  };
  componentWillMount() {

  }
  render() {
    console.log(this.props.navigation)
    return (
      <ImageBackground source= {background} style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => {
            Backend.sendMessage(message);
          }}
          createdBy={Backend.getUid()}
        />
      </ImageBackground>
    );
  }

  componentDidMount() {
    // alert(JSON.stringify(this.props.navigation.state.params.uid))
    const chatId = this.props.navigation.state.params.uid;
    Backend.loadMessages(chatId, (message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}

// Chatt.defaultProps = {
//   nama: 'Ahsan',
// };
//
// Chatt.propTypes = {
//   name: React.propTypes.string,
// };


export default Chatt;
