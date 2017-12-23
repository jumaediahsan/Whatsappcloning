import React from 'react';
import { Text, Modal, View, TouchableOpacity } from 'react-native';
import { CardSection } from './CardSection';

const Popup = ({ children, visible, onAccept }) => {
    const { containerStyle, textStyle, cardSectionStyle, buttonStyle, textButtonStyle } = Style;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>

                <CardSection>
                    <TouchableOpacity style={buttonStyle} onPress={onAccept}>
                        <Text style={textButtonStyle}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </CardSection>
            </View>
        </Modal>
    );
};

const Style = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
    },
    containerStyle: {
        backgroundColor: 'white',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
    },

    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'blue',
        marginRight: 10,
        marginBottom: 10
    },
    textButtonStyle: {
        alignSelf: 'center',
        color: 'deepskyblue',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { Popup };
