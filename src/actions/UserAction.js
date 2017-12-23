import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import {
  USER_FETCH_SUCCESS,
  CHAT_TABLE_SUCCESS,
  NAME_FETCH_SUCCESS
} from './types';

export const userFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/users`)
      .once('value') .then(snapshot => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const nameFetch = () => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users`).orderByChild("createdBy").equalTo(currentUser.uid)
      .once('value') .then(snapshot => {
        dispatch({ type: NAME_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

toMessagesScreen = (chat) => {
  return {
    type : 'MESSAGES_SCREEN',
    payload: chat
  }
}

export const chatTable = (rowData, chatuser) => {
  const { currentUser } = firebase.auth();
  chatuser = chatuser.filter(chat => chat.members[rowData.uid] == true); // return filter selalu bertipe array
  const chat = chatuser[0]
  return (dispatch) => {
    if (chat) {
      dispatch(toMessagesScreen(chat));
    } else {
      firebase.database().ref(`/chats`)
        .push({name:rowData.name, members: {[rowData.uid]: true, [currentUser.uid]: true} ,image:rowData.url, createdAt: firebase.database.ServerValue.TIMESTAMP })
        .then ((result => {
          firebase.database().ref(`/chats/${result.key}`)
            .once('value', snapshot => {
              const chat = {...snapshot.val(), uid: snapshot.key} //tapi ini masih salah wkwkwk hahaha
              dispatch(toMessagesScreen(chat)); //keperluannya cuman buat toMessageScreen aja , cba di log snapshot .valnya
            }) //yang didalam snapshot di comment semua diganti console.log
        }))
        .catch(err => {
          console.log(err);
        })
    }
  }

  // chatuser = chatuser.filter(chat => {})
//   return (dispatch) => {
//     //ref pakai harus pakai uid(unik)
//     firebase.database().ref(`/users/${rowData.uid}`)
//       .once('value')
//       .then(snapshot => {
//         //cek ketersediaan user di db, null == tidak ada
//         if (snapshot.val() != null) { // snapshot.val() sama dengan snapshot.val() != null
//             dispatch(toMessagesScreen());
//         } else {
//           firebase.database().ref(`/chats`)
//             .push({name:rowData.name, to:rowData.uid, createdBy: currentUser.uid, createdAt: firebase.database.ServerValue.TIMESTAMP })
//             .then ((result => {
//               firebase.database().ref(`/chats/${result.key}`)
//                 .once('value', snapshot => {
//                   dispatch({ type: CHAT_TABLE_SUCCESS, payload: snapshot.val() });
//                   dispatch(toMessagesScreen());
//                 })
//             }))
//             .catch(err => {
//               console.log(err);
//             })
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   };
};
