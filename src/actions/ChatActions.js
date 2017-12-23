import firebase from 'firebase';
import { CHAT_FETCH_SUCCESS } from './types';

export const chattFetch = () => {
  const {uid} = firebase.auth().currentUser;
  console.log(firebase.auth().currentUser);
  return (dispatch) => {
    //pakai on, biar ketika ada data nambah otomatis reducer chat bertambah
    firebase.database().ref(`/chats`).orderByChild(`/members/${uid}`).equalTo(true)
      .on('value', snapshot => {
        dispatch({ type: CHAT_FETCH_SUCCESS, payload: snapshot.val() });
      })
  };
};
