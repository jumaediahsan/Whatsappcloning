import React,{Component} from 'react';
import _ from 'lodash';
import { Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { nameFetch } from '../../../actions';
import { Card, CardSection } from './common';
import firebase from 'firebase';

 class BodyProfile extends Component {
   componentWillMount() {
     this.props.nameFetch()

     this.createDataSource(this.props);
   }
   componentWillReceiveProps(nextProps) {
     this.createDataSource(nextProps);
   }

   createDataSource({ names }) {
     const ds = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2
     });

     this.dataSource = ds.cloneWithRows(names);
   }

    render() {
      const { containerStyle, nameStyle, attentionStyle, wrapStyle, headerContentStyle, infoStyle, captionStyle, wrapText } = styles;
      const { currentUser } = firebase.auth();
        return (
          <ListView 
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={rowData => (
            <View style={containerStyle}>
                <CardSection>
                  <Text style ={nameStyle}>{rowData.name} </Text>
                </CardSection>
                <View style={wrapText}>
                  <Text style={attentionStyle}>{`Ini bukan username atau pin Anda. Nama ini \nakan ditampilkan ke kontak WhatsApp Anda`}</Text>
                </View>
                <Card>
                  <CardSection>
                    <View style={headerContentStyle}>
                      <Text style={infoStyle}>info dan nomor telepon</Text>
                      <Text style={captionStyle}>Belum Bisa Status</Text>
                    </View>
                  </CardSection>
                  <CardSection>
                      <Text style={nameStyle}>{currentUser.email}</Text>
                  </CardSection>
                </Card>
            </View>
          )}
        />
        );
    }
}


const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#d8d5d5',
    marginBottom: 0
  },
  nameStyle:{
    fontSize: 16,
    padding: 10
  },
  wrapText: {
    backgroundColor: '#d8d5d5'
  },
  attentionStyle: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  headerContentStyle: {
    flexDirection: 'column', // menampilkan text sebagai kolom bukan baris
    justifyContent: 'space-around' // ada jarak antara textnya
  },
  infoStyle: {
    fontSize: 12,
    color: 'green',
    paddingLeft: 10,
  },
  captionStyle: {
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 10
  }

}
const mapStateToProps = state => {
  const names = _.map(state.authsign.names, (val, uid) => {
    return { ...val, uid };
  });
  return { names };
};

export default connect(mapStateToProps, { nameFetch })(BodyProfile);
