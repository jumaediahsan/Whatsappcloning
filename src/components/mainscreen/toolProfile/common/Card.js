import React from 'react';
import { View } from 'react-native';

// {props.children} == {props.album.title}
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1, // border/batas tipis luar
    borderRadius: 2, // ujung pada border bulat
    borderColor: '#ddd', // warna border abu-abu
    borderBottomWidth: 0, // border bawah tersembunyi 0
    shadowColor: '#000', // warna shadow
    shadowOffset: { width: 0, height: 2 }, // sisi shadow yg ditampilkan ini tidak ada shadow
    //di kiri dan kanan
    shadowOpacity: 0.1, // kegelapan shadow
    shadowRadius: 2, // ujung shadow bulat harus sama dengan border radius
    elevation: 1, // ini dijelaskan kelak
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: 10, // agar ada jarak per album
  }
};
export { Card };
