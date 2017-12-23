import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { IMAGE_PROFILE } from './types';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadProfile = (uri, mime = 'img/jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const database = firebase.database();
    const imageRef = firebase.storage().ref('images').child(`${sessionId}`);
    const { currentUser } = firebase.auth();

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        const TaskImage = imageRef.put(blob, { contentType: 'image/png' });

        TaskImage.on('state_changed', snapshot => {
          const showURL = TaskImage.snapshot.downloadURL;
          const postData = {
            url: showURL
          };
        const DataImage = database.ref(`/users/${currentUser.uid}/`);
          DataImage.update(postData);
        });
        return TaskImage;
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((err) => {
        reject(err);
    });
  });
};


export const ActionProfile = () => {
  return (dispatch) => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
               uploadProfile(response.uri)
              .catch(err => console.log(err));
            }
          });
  };
};

export const ValueImage = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/url`)
    .on('value', snapshot => {
      dispatch({ type: IMAGE_PROFILE, payload: snapshot.val() });
  });
  };
};
