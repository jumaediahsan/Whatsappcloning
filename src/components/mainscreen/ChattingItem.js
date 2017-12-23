import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { CardSection } from '../common';

class ChattingItem extends Component {

    render() {
      const { name, image } = this.props;
      const {
        headerContentStyle,
        thumbnailStyle,
        thumbnailContainerStyle,
        headerTextStyle
       } = styles;
        return (
          <TouchableOpacity onPress={this.props.onPress}>
            <View>
              <CardSection>
                  <View style={thumbnailContainerStyle}>
                    <Image
                      style={thumbnailStyle}
                      source={{ uri: image }}
                    />
                  </View>
                  <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{name}</Text>
                  </View>
              </CardSection>
            </View>
          </TouchableOpacity>
        );
    }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column', // menampilkan text sebagai kolom bukan baris
    justifyContent: 'space-around' // ada jarak antara textnya
  },
  headerTextStyle: {
    fontSize: 20 // untuk modifikasi ukuran text
  },
  thumbnailStyle: {
    height: 40, // harus di set tinggi dan lebarnya agar muncul di layar
    width: 40, // karena ini adalah react-native
    borderRadius: 100
  },
  thumbnailContainerStyle: {
    justifyContent: 'center', // untuk set isi dari agar tengah
    alignItems: 'center', // tengah
    marginLeft: 10, // ada jarak 10 di kiri image
    marginRight: 10 // ada jarak 10 di kanan image
  },
};
export default ChattingItem;
