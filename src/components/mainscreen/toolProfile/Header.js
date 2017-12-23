import React,{Component} from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ActionProfile, ValueImage } from '../../../actions/ActionProfile';
import mie from './image/mie.png';

 class Header extends Component {
   componentWillMount() {
     this.props.ValueImage();
   }
   showImageLibrary() {
    this.props.ActionProfile();
   }

    render() {
      const { headerStyle, secondheaderStyle, profileWrap, profileEpic, wrapcamera, textStyle } = styles;
        return (
          <View style={headerStyle} >

            <View style={secondheaderStyle}>
              <TouchableOpacity onPress={this.showImageLibrary.bind(this)}>
                <View style={profileWrap}>
                  { this.props.avatarSource === null ? <Text style={textStyle}>Select a Photo</Text> :
                    <Image style={profileEpic} source={{ uri: this.props.avatarSource }} />
                  }
                </View>
              </TouchableOpacity>
              <View style={wrapcamera}>
                <Icon name='photo-camera' color='#fff' />
              </View>
            </View>
          </View>
        );
    }
}

const styles = {
  headerStyle: {
    // flex: 1,
    backgroundColor: '#d8d5d5'
  },
  secondheaderStyle: {
    backgroundColor: 'green',
    marginTop: 30,
    marginRight: 110,
    marginLeft:110,
    borderRadius: 100,
    marginBottom: 60
  },
  profileWrap: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 6,
    alignSelf: 'center'
  },
  profileEpic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff'
  },
  wrapcamera: {
    position: 'absolute',
    // top: 0,
    bottom: 0,
    // left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#186321',
    height:40,
    width: 40,
    borderRadius: 100,
  },
  textStyle: {
  paddingTop: 60,
  alignSelf: 'center'
},
};

const mapStateToProps = ({ profile }) => {
  const { avatarSource } = profile;
  return { avatarSource };
};
export default connect(mapStateToProps, {ActionProfile, ValueImage})(Header);
