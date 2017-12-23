import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Tstart = ({ onPress, children }) => {
const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>
          {children}
        </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#16a085',
    borderRadius: 5,
    marginLeft: 2,
    marginRight: 2
  }
};

export { Tstart };
