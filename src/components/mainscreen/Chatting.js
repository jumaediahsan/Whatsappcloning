import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import firebase from 'firebase';
import { chattFetch } from '../../actions';
import ChattingItem from './ChattingItem';

class Chatting extends Component {
  componentWillMount() {
    this.props.chattFetch();

    this.createDataSource(this.props);
  }
    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps);
    }

    createDataSource({ chatuser }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(chatuser);
    }
  // renderRow(chats) {
  //     return <ChattingItem chats={chats} {...chats}/>;
  //   }
  //   <ListView
  //     enableEmptySections
  //     dataSource={this.dataSource}
  //     renderRow={this.renderRow}
  //
  //   />

  render() {
    console.log(this.props.chatuser)
    const { navigate } = this.props.navigation;
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={dataChat => (
          <ChattingItem onPress={() => navigate('ChattScreen', {name:dataChat.name, uid: dataChat.uid})} {...dataChat} />
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  const chatuser = _.map(state.chatuser, (val, uid) => {
    return { ...val, uid };
  });
  return { chatuser };
};
export default connect(mapStateToProps, { chattFetch })(Chatting);
